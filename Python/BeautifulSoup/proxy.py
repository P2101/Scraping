import requests

def main():
    # Definir la URL a la que deseas hacer la solicitud
    url = 'http://httpbin.org/ip'

    # Definir la configuración del proxy
    proxy = {
        'http': 'http://user:password@proxy_ip:proxy_port',
        'https': 'https://user:password@proxy_ip:proxy_port'
    }

    try:
        # Realizar la solicitud HTTP utilizando el proxy
        response = requests.get(url, proxies=proxy)
        
        # Verificar si la solicitud fue exitosa
        if response.status_code == 200:
            print('Solicitud exitosa:')
            print('Dirección IP obtenida:', response.json()['origin'])
        else:
            print('La solicitud falló. Código de estado:', response.status_code)
    
    except Exception as e:
        print('Error al realizar la solicitud:', e)

if __name__ == "__main__":
    main()
