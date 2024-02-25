import requests
from bs4 import BeautifulSoup
import re

def get_google():
    # Desactivar las advertencias de solicitud no segura (por ejemplo, ignorar los errores de certificado SSL)
    requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)
    
    url = "https://novoatacarejo.com/oferta/xt/xt.listar.php"
    headers = {
         'Accept': "application/json, text/javascript, */*; q=0.01",
         "Accept-Language": "es-ES,es;q=0.9,en;q=0.8,ca;q=0.7",
         'Connection': "keep-alive",
         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
         'Origin': 'https://novoatacarejo.com',
         'Referer': 'https://novoatacarejo.com/oferta/mobile.php',
         "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
         "X-Requested-With": "XMLHttpRequest",
       }
    body = 'id=19'
    try:
        response = requests.post(url, headers=headers, data=body, verify=False)
        response.raise_for_status()
        # Manejar la respuesta como JSON
        data = response.json()
        # print(data)  # Puedes manejar los datos de la respuesta JSON aquí
        match = re.search(r'href="(.*?flipbook.*?)"', str(data))
        if match:
            new_url = match.group(1)  # Obtener el primer grupo capturado (la URL)
            # print(new_url)
            getPdf(new_url)
        else:
            print("No se encontró ninguna URL con el patrón especificado.")
    except requests.exceptions.RequestException as e:
        print(f"Ocurrió un error durante la solicitud HTTP: {e}")


def getPdf(url):
    # ANULAMOS EL CERTIFICADO SSL CON VERIFY FASLE, SI HEADERS NO FUNCIONAN Y ES GET
    response = requests.get(url, verify=False)
    html = BeautifulSoup(response.content, 'html.parser')
    
    pdf = html.select_one('#PDFF').get('source')
    print(pdf)

if __name__ == "__main__":
    search_results = get_google()
