from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time
from random import randint

chrome_options = Options()
service = Service() # Importante añadir el service
chrome_options.add_experimental_option('detach', True) # Para que no se cierre el navegador

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://www.google.com/recaptcha/api2/demo')

time.sleep(randint(2, 5))

driver.switch_to.frame(0)

driver.find_element(By.XPATH, '//*[@id="recaptcha-anchor"]').click()

# https://www.youtube.com/watch?v=22nNo4XQQpg&ab_channel=Palaus
