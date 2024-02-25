const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  const url =
    "https://ep43qpdx9q-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.1)%3B%20Browser%3B%20instantsearch.js%20(4.41.0)%3B%20Magento2%20integration%20(3.9.1)%3B%20JS%20Helper%20(3.8.2)";

  // Definir los datos de la solicitud POST
  const postData = {
    requests: [
      {
        indexName: "spprod_drugstore_pl_products",
        params:
          "highlightPreTag=__aisighlight__&highlightPostTag=__%2Faisighlight__&ruleContexts=%5B%22magento_filters%22%5D&hitsPerPage=25&analyticsTags=%5B%22catalog%22%2C%22mobile%22%2C%22not%20logged%20in%22%5D&clickAnalytics=true&analytics=true&query=&page=0&maxValuesPerFacet=50&facets=%5B%22badges%22%2C%22price.PLN.default%22%2C%22brand%22%2C%22capacity%22%2C%22kind%22%2C%22makeupattribute%22%2C%22size%22%2C%22skin_type%22%2C%22categories.level0%22%2C%22categories.level1%22%5D&tagFilters=&facetFilters=%5B%22badges%3APromocja%22%2C%5B%22categories.level0%3Ae-DROGERIA%22%5D%5D&numericFilters=%5B%22visibility_search%3D1%22%5D",
      },
      {
        indexName: "spprod_drugstore_pl_products",
        params:
          "highlightPreTag=__aisighlight__&highlightPostTag=__%2Faisighlight__&ruleContexts=%5B%22magento_filters%22%5D&hitsPerPage=1&analyticsTags=%5B%22catalog%22%2C%22mobile%22%2C%22not%20logged%20in%22%5D&clickAnalytics=false&analytics=false&query=&page=0&maxValuesPerFacet=50&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&facets=%5B%22categories.level0%22%5D&numericFilters=%5B%22visibility_search%3D1%22%5D&facetFilters=%5B%22badges%3APromocja%22%5D",
      },
    ],
  };

  // Convertir el objeto de datos a cadena JSON
  const body = JSON.stringify(postData);

  // Realizar la solicitud POST con EVALUATE
  const response = await page.evaluate((url, body) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8,ca;q=0.7",
        Connection: "keep-alive",
        Origin: "https://www.superpharm.pl",
        Referer: "https://www.superpharm.pl/",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
        "content-type": "application/json", // Establecer el tipo de contenido como JSON
        "x-algolia-api-key":
          "YzY2YmQ5YTg5NjIwZWM3MmViNGJiMTM1MmM5Njc3ZTg4MTkzZjMwYjZjMmQxODNhNDhjMGNkZWYxNzljYWM1Y3RhZ0ZpbHRlcnM9",
        "x-algolia-application-id": "EP43QPDX9Q",
      },
      body: body, // Pasar el cuerpo de la solicitud
    })
      .then((response) => response.json())
      .catch((error) =>
        console.error("Error en la solicitud POST:", error.message)
      );
  }, url, body);

  // Imprimir la respuesta
  console.log(response);

  await browser.close();
})();
