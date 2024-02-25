const puppeteer = require("puppeteer");
const fs = require("fs");
const { log } = require("console");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  const url = "https://charterenmenorca.com/alquiler-barcos-menorca/";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  await page.waitForSelector(".type-barco_alquiler");
  const boats = await page.$$(".type-barco_alquiler");

  const charters = [];
  for (const boat of boats) {
    let title = "Null";
    let info = [];
    let boatinfo = [];
    let url = "Null";
    try {
      title = await page.evaluate(
        (el) => el.querySelector(".elementor-heading-title > a").textContent,
        boat
      );
      // console.log("Title:", title);

      const boatInfoElements = await boat.$$(".elementor-icon-list-text");
      for (const infoElement of boatInfoElements) {
        info = await page.evaluate((el) => el.textContent.trim(), infoElement);
        boatinfo.push(info);
        // console.log("Info:", boatinfo);
      }
      url = await page.evaluate(
        (el) => el.querySelector(".elementor-heading-title > a").href,
        boat
      );
      // console.log("Url:", url);
    } catch (error) {
      console.error("Error:", error);
    }

    // Convertir a OBJETO. creamos diccionario y lo añadimos al array
    const boatObject = {
      title: title,
      eslora: boatinfo[0].replace("Eslora: ", ""),
      manga: boatinfo[1].replace("Manga: ", ""),
      capacidad: boatinfo[2].replace("Capacidad: ", ""),
      url: url,
    };

    // Agregar el objeto del barco al array
    charters.push(boatObject);


    
    // PARA GUARDAR EN UN CSV
    // if (title !== 'Null'){
    //   charters.push(title);
    //   charters.push(boatinfo);
    //   charters.push(url);
    //   fs.appendFile('Puppeteer/charters/results.csv', `${title},${boatinfo[0].replace('Eslora: ', '')},${boatinfo[1].replace('Manga: ', '')}, ${boatinfo[2].replace('Capacidad: ', '')},${url}\n`, (err) => {
    //     if (err) throw err;
    //     console.log('The "data to append" was appended to file!');
    //   });
    // }

    // // Esto NOO
    // charters.title = title;
    // charters.eslora = boatinfo[0];
    // charters.manga = boatinfo[1];
    // charters.capacidad = boatinfo[2];
    // charters.url = url;
  }

  // CONVERTIMOS A JSON
  const chartersJSON = JSON.stringify(charters);

  await charter(charters, browser, puppeteer);
  // console.log(charters);
  await browser.close();
})();

async function charter(charters, browser, puppeteer) {
  const page = await browser.newPage();

  for (const charter of charters) {
    // console.log(charter.url);
    await page.goto(charter.url);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const html = await page.content();

    if (charter.title.includes("Quicksilver 755 Sundeck")) {
      if (html.includes("data-code")) {
        const regex = /data-code="(\d+)"/;
        const id = html.match(regex);

        await new Promise((resolve) => setTimeout(resolve, 1100));
        new_url = `https://charterenmenorca.mybooking.es/api/booking/frontend/products/${id[1]}/occupation?from=2024-04-01&to=2024-05-01&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true`;

        get_price(new_url, browser, puppeteer, charter.title);
        // console.log(charter.title);
        // console.log(new_url);
      }
    }
    await browser.close();
  }
}

async function get_price(url, browser, puppeteer, name) {
  const page = await browser.newPage();
  await page.goto(url);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // const html = await page.content();
  const json = await page.evaluate(() => {
    const preElement = document.querySelector('pre');
    if (preElement) {
      return preElement.textContent;
    }
    return null;
  });
  await new Promise((resolve) => setTimeout(resolve, 1100));
  const data = JSON.parse(json);
  const prices = data.prices;

  // Obtener todas las claves del objeto
  const keys = Object.keys(prices);

  const thirdKey = keys[2];
  const price = prices[thirdKey];
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(`El charter ${name} en la fecha ${thirdKey} tiene un precio ${price}`);
  // Acceder al tercer elemento del objeto
  // const price = data[keys[2]]
  // const date = data[keys[2]];
  // console.log(`La fecha ${date} tiene un precio ${price}`);

  await browser.close();
}
