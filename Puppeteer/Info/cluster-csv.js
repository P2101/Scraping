const { Cluster } = require("puppeteer-cluster");
const fs = require("fs");

const urls = [
  "https://www.amazon.com/s?k=amazonbasics&pd_rd_r=03e5e33c-4faf-452d-8173-4a34efcf3524&pd_rd_w=EQNRr&pd_rd_wg=PygJX&pf_rd_p=9349ffb9-3aaa-476f-8532-6a4a5c3da3e7&pf_rd_r=8RYH7VRZ4HSKWWG0NEX3&ref=pd_gw_unk",
  "https://www.amazon.com/s?k=oculus&i=electronics-intl-ship&pd_rd_r=03e5e33c-4faf-452d-8173-4a34efcf3524&pd_rd_w=iMBhG&pd_rd_wg=PygJX&pf_rd_p=5c71b8eb-e4c7-4ea1-bf40-b57ee72e089f&pf_rd_r=8RYH7VRZ4HSKWWG0NEX3&ref=pd_gw_unk",
];
(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2, // Indicar cuantas queremos a la vez
    puppeteerOptions: { // Opción como puppeteer.launch
      
      headless: false,
      defaultViewport: null,
      userDataDir: "./tmp",
    },
  });

  // Event handler to be called in case of problems
  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);

    let isBtnDisabled = false;
    while (!isBtnDisabled) {
      await page.waitForSelector('[data-cel-widget="search_result_0"]');
      const productsHandles = await page.$$(
        "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
      );

      items = [];
      for (const producthandle of productsHandles) {
        let title = "Null";
        let price = "Null";
        let img = "Null";
        let url = "Null";

        try {
          title = await page.evaluate(
            (el) => el.querySelector("h2 > a > span").textContent,
            producthandle
          );
        } catch (error) {}
        // console.log('title: ', title);
        try {
          price = await page.evaluate(
            (el) => el.querySelector(".a-price > .a-offscreen").textContent,
            producthandle
          );
          price = price.replace("US$", "");
        } catch (error) {}
        // console.log('price: ', price);
        try {
          img = await page.evaluate(
            (el) => el.querySelector(".s-image").getAttribute("src"),
            producthandle
          );
        } catch (error) {}
        try {
          url = await page.evaluate(
            (el) => el.querySelector("a.a-link-normal").href,
            producthandle
          );
        } catch (error) {}
        if (title !== "Null") {
          items.push(title);
          items.push(price);
          items.push(img);
          items.push(url);
          fs.appendFile(
            "results2.csv",
            `${title.replace(/,/g, ".")},${price},${img},${url}\n`,
            function (err) {
              if (err) throw err;
            }
          );
        }
      }

      console.log(items);
      console.log(items.length);
      await page.waitForSelector(".s-pagination-next", { visible: true });
      const is_disabled =
        (await page.$(".s-pagination-next.s-pagination-disabled")) !== null;

      await new Promise((resolve) => setTimeout(resolve, 1600));
      isBtnDisabled = is_disabled;
      if (!is_disabled) {
        await Promise.all([
          page.click(".s-pagination-next"),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);
      }
    }
  });

  for (const url of urls) {
    await cluster.queue(url);
  }
  await cluster.idle();
  await cluster.close();
})();
