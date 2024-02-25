from selenium import webdriver

# Obtener el contenido de scripts que se cargan con JS
url = 'https://www.guess.mx/'
proxy_address = '38.7.109.253' # proxy from MX
proxy_port = '8080'  

options = webdriver.ChromeOptions()
options.add_argument(f'--proxy-server=http://{proxy_address}:{proxy_port}')
options.add_argument('--headless')  # Ejecutar sin interfaz gráfica

driver = webdriver.Chrome(options=options)

driver.get(url)

driver.implicitly_wait(10)

# Obtener el contenido después de que se cargue mediante JavaScript
content = driver.page_source

# Imprimir el contenido
print(content)

# Cerrar el navegador
driver.quit()
