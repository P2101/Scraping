const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp", 
    // ignoreDefaultArgs: ["--enable-automation"],
  });
  const page = await browser.newPage();

  const headers = {
    authority: "www.google.com",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "es-ES,es;q=0.9,en;q=0.8,ca;q=0.7",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    "x-client-data":
      "CJe2yQEIorbJAQipncoBCITnygEIlqHLAQiFoM0BCI/hzQEIn+7NAQin7s0BCN3uzQEIg/DNAQiG8M0BCMDxzQEIrvLNAQj7880BCJD1zQEInvbNARjimM0BGKfqzQEY+fLNAQ==",
  };

  await page.setExtraHTTPHeaders(headers);
  await page.goto("https://www.google.com/search?q=ping+pong");

  try {
    const titles = await page.$$eval('a div[role="link"]', (links) => { // función links con todos los links
      return links.map((link) => {  // Función para recorrer todos los divs
        return link.innerText;
      });
    });

    const firstThreeTitles = titles.slice(0, 3);
    console.log(firstThreeTitles);
  } catch (error) {
    console.error("Error al obtener los títulos:", error);
  }

  await browser.close();
})();
