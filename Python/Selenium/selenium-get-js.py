from selenium import webdriver

# Configurar el navegador
options = webdriver.ChromeOptions()
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36")

# Agrega otras opciones según sea necesario
driver = webdriver.Chrome(options=options)

try:
    # Cargar la página
    driver.get('https://www.sallybeauty.cl/')

    # Esperar a que la página se cargue completamente (puedes ajustar este tiempo según sea necesario)
    driver.implicitly_wait(40)

    # Ejecutar JavaScript para obtener todos los scripts
    scripts = driver.execute_script("return document.scripts;")
    
    # Buscar el script específico que contiene cierto texto (ajusta según tus necesidades)
    target_script = None
    for script in scripts:
      # EN TODO CASO, CAMBIAR EL CACHEHINTS
        if 'cacheHints' in script.get_attribute('outerHTML'):
            target_script = script
            break

    # Imprimir el HTML del script específico
    if target_script:
        print(target_script.get_attribute('outerHTML'))
    else:
        print("No se encontró el script específico.")

except Exception as e:
    print(f"Error durante la ejecución: {e}")

finally:
    # Cerrar el navegador
    driver.quit()
