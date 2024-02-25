from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager # pip install webdriver-manager

opts = Options() # Para añadir los headers
opts.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36")
opts.add_argument("--headless")

# Sin abrir PseudoBrowser:
driver = webdriver.Chrome(
    service=Service('./chromedriver'),
    options=opts
)

# driver = webdriver.Chrome(
#     service = Service(ChromeDriverManager().install()),
#     options = opts
# )

driver.get('https://www.airbnb.com/')

sleep(3)

titulos_anuncios = driver.find_elements(By.XPATH, '//div[@data-testid="listing-card-title"]') # Mirar clase
for titulo in titulos_anuncios:
    print(titulo.text)
