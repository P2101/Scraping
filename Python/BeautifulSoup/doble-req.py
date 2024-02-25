from bs4 import BeautifulSoup
import re
import requests

def get_url(url, headers):
    response = requests.get(url, headers=headers)
    html = response.text

    soup = BeautifulSoup(html, 'html.parser')
    urls = soup.find_all(class_='c-submenu__link', href=lambda href: href and ('tv' in href or 'television' in href))

    for urll in urls:
        if not 'http' in urll.get('href'):
            url = url + urll.get('href')
            print(url)
            get_prices(url, headers)

# def get_prices(url, headers):
#     response = requests.get(url, headers=headers).text
#     soup = BeautifulSoup(response, 'html.parser')
    
#     divs = soup.find_all(class_='plans-tv__box-ctn')
#     for div in divs:
#         names = div.find_all(class_='plans-tv__box-descrip')
#         prices = div.find_all(class_='plans-tv__box-body')
#         for name in names:
#             print(name.get_text())
# def get_prices(url, headers):
#     response = requests.get(url, headers=headers).text
#     soup = BeautifulSoup(response, 'html.parser')
    
#     divs = soup.find_all(class_='plans-tv__box-ctn')
#     for div in divs:
#         names = div.find_all(class_='plans-tv__box-descrip')
#         elements = soup.find_all(lambda tag: tag.name == 'div' and 'plans-tv__box-body' in tag.get('class', []))
#         for name in names:
#             print(name.get_text())
#         for element in elements:
#             span = element.find('span')  
#             if span:
#                 print(span.get_text())  

def get_prices(url, headers):
    response = requests.get(url, headers=headers).text
    soup = BeautifulSoup(response, 'html.parser')
    
    divs = soup.find_all(class_='plans-tv__box-ctn')
    for div in divs:
        name = div.find(class_='plans-tv__box-descrip')
        element = div.find(class_='plans-tv__box-body')
        
        # Verifica que haya al menos un elemento en name y element
        if name and element:
            name_text = name.get_text().strip()  # Obtiene el texto del elemento name y elimina los espacios en blanco
            
            # Encuentra el primer elemento span dentro de element
            first_span = element.find('span')
            if first_span:
                span_text = first_span.get_text().strip()  # Obtiene el texto del primer span y elimina los espacios en blanco
                print("Name:", name_text)
                print("Price:", span_text)






headers ={
    'authority': 'www.movistar.com.co',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'es-ES,es;q=0.9,en;q=0.8,ca;q=0.7',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
    'user-agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    }
url = 'https://www.movistar.com.co'
get_url(url, headers)
