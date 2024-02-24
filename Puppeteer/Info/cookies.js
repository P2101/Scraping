const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: "./tmp",
        // args: ['--incognito'] // Esta línea activa el modo incógnito
    });
    const page = await browser.newPage();

    const headers = {
   'authority': 'www.gmx.es',
   'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
   'accept-language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
   'cache-control': 'max-age=0',
//    'cookie': 'idcc=1; tp_id=E0Zs-9vTwVJUgBhC9Iaz4a9VqxBTEFsul7dYzn-5L66gYkYJkSEDdbYU0fd1kXGPB7nBwQ; NGUserID=oyzpdely-318-1674766598-0; uiconsent={%22permissionFeature%22:[%22fullConsent%22]}; consentLevel=3; wa=ffa3f37f90943649adad30763640ac7e; ua_id=8e2fcbbd-58ed-417b-9503-f7d47c7658cd; cookieKID=kid%40autoref%40gmx.es; cookiePartner=kid%40autoref%40gmx.es; euconsent-v2=CP1pK0AP1pK0AAcABBENAbEkAP_gAAAAAAYgJxJV9H7fbWFjcXp3aft0eY0H1dB76uQhBhTAE-AFyBuQ8JwG12EwMASApqACERIAohZBIQEEHAFUAFCAQIAFAQHsIkCUhAAKICBEABEQAAIQAAgKEAIAEAAIgEBHIhWAmBiA6dLkxcCACIAAB0BYAgAAAIABAgMBBUAIQBAIAIIIQygAAQBAAAIAAAAAARAAAABDQAAAIAEAAAEgAAEAAAAwSAMABUAGgATABHAD9AXmOgDgAVABoAEwAfoBFgEXgLzIQAgAmACOJQBAAmACOAReAvMpAHAAqADQAJgA_QCLAIvAXmUAAgCO.f_wAAAAAAdAA; ushallpass=true; adtrgtng=eyJwYSI6IjQzIiwicGciOiJtIn0=',
   'upgrade-insecure-requests': '1',
   'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
  
    }
    await page.setExtraHTTPHeaders(headers);
    const url = 'https://www.gmx.es/#.1559568-header-navlogin2-1'
    await page.goto(url);
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#login-email');
    // const html = await page.content();
    // console.log(html);
    // if (html.hasOwnProperty('onetrust-accept-bt-hnandler')){
    //     await page.click('#onetrust-accept-btn-handler'),
    //     console.log('yes');
    // }

    await page.type('#login-email', 'pferre11@gmail.es');
    await new Promise((resolve) => setTimeout(resolve, 1300));
    await page.type('#login-password', 'SantBartomeu24');
    await new Promise((resolve) => setTimeout(resolve, 2700));
    await page.click('.login-submit');
    
    const cookies = await page.cookies();
    await fs.writeFile('./cookies2.json', JSON.stringify(cookies, null, 2));
    console.log(cookies);
    
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await browser.close();
})();
