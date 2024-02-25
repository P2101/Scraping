const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  const url =
    "https://charterenmenorca.mybooking.es/api/booking/frontend/products/23/occupation?from=2024-04-01&to=2024-05-01&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  // Accedemos al contenido JSON dentro de la etiqueta <pre>
  const json = await page.evaluate(() => {
    const preElement = document.querySelector('pre');
    if (preElement) {
      return preElement.textContent;
    }
    return null;
  });

//   if (json) {
//     console.log(json);
//   } else {
//     console.log('No se encontró la etiqueta <pre> en la página.');
//   }

  const data = JSON.parse(json);
  const prices = data.prices;
  const ocupated = data.occupation;

  const date = '2024-04-12';
  if (ocupated.hasOwnProperty(date)){
    const obj = ocupated[date];
    if (obj.available){
        console.log(`Para el día ${date} el precio es ${prices[date]}`);
    } else {
        console.log('No está disponible para esta fecha');
    }
  }

  await browser.close();
})();
