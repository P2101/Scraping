const puppeteer = require("puppeteer");
const express = require("express");

const app = express();
app.set("port", 9101);
app.use(express.json());

app.post("/charter", (req, res) => {
  const barco = req.body.barco;
  const fecha = req.body.fecha;

  data(barco, fecha);
});

async function data(barco, fecha) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  console.log("putaspanya", barco);
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
    await new Promise((resolve) => setTimeout(resolve, 600));
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

    // Convertir a Objeto
    const boatObject = {
      title: title,
      eslora: boatinfo[0].replace("Eslora: ", ""),
      manga: boatinfo[1].replace("Manga: ", ""),
      capacidad: boatinfo[2].replace("Capacidad: ", ""),
      url: url,
    };

    // Agregar el objeto del barco al array
    charters.push(boatObject);
  }

  await charter(charters, browser, barco, fecha);
}

async function charter(charters, browser, barco, fecha) {
  for (const charter of charters) {
    const page = await browser.newPage();
    try {
      await page.goto(charter.url);
      await page.waitForSelector("body");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // const html = await page.content();

      if (charter.title.includes(barco)) {
        if (html.includes("data-code")) {
          const regex = /data-code="(\d+)"/;
          const id = html.match(regex);

          await new Promise((resolve) => setTimeout(resolve, 1100));
          new_url = `https://charterenmenorca.mybooking.es/api/booking/frontend/products/${id[1]}/occupation?from=${fecha}&to=${fecha}&api_key=5YTw3PxevdHAJXBk1FlND84uyEr9obVaCWhUKOnLMGcQqZIp&duration_scope=in_one_day&firstday=true`;

          await get_price(new_url, browser, puppeteer, charter.title, fecha);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await page.close();
    }
  }
}

async function get_price(url, browser, puppeteer, name, fecha) {
  const page = await browser.newPage();
  await page.goto(url);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // const html = await page.content();
  const json = await page.evaluate(() => {
    const preElement = document.querySelector("pre");
    if (preElement) {
      return preElement.textContent;
    }
    return null;
  });
  await new Promise((resolve) => setTimeout(resolve, 1100));
  const data = JSON.parse(json);
  const prices = data.prices;

  const price = prices[fecha];
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(
    `El charter ${name} en la fecha ${fecha} tiene un precio ${price}`
  );

  await browser.close();
}

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Aplicación ejecutándose en el puerto", app.get("port"));
});
