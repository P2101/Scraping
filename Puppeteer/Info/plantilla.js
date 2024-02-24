const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: "./tmp",
        //args: [
        //    '--proxy-server=https://IP:Port',
        //]
    });
    const page = await browser.newPage();
    const url = 'www.example.com'
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const htmlContent = await page.content();
    console.log(htmlContent);

    await browser.close();
})();
