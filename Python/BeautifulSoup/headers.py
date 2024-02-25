import requests
from bs4 import BeautifulSoup

def google():
    headers = {
        'authority': "www.google.com",
    'accept':
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "es-ES,es;q=0.9,en;q=0.8,ca;q=0.7",
    "cache-control": "max-age=0",
    #   'cookie: SOCS=CAESHAgCEhJnd3NfMjAyNDAxMjMtMF9SQzMaAmVzIAEaBgiA1dutBg; OTZ=7404154_52_52_123900_48_436380; SEARCH_SAMESITE=CgQIqJoB; 1P_JAR=2024-2-12-15; SID=g.a000gwhH_OFU4jt1BkOKimetinMawRAIFpsiXtUO-Stfioe11Y03oKI_npvoAvXvWDLg0UG34gACgYKAVYSAQASFQHGX2MimHtVMwoWtUIPBWjNGVlOgBoVAUF8yKpxNmF3VfZSNmqM_chJBH5b0076; __Secure-1PSID=g.a000gwhH_OFU4jt1BkOKimetinMawRAIFpsiXtUO-Stfioe11Y03rj3UQKjSWbajPMwjftVWvAACgYKAT0SAQASFQHGX2MictYnA0AjUZ4ZK_IiuLehoVAUF8yKrIcZKWRzZS6Z6OjncGZWyr0076; __Secure-3PSID=g.a000gwhH_OFU4jt1BkOKimetinMawRAIFpsiXtUO-Stfioe11Y03xAcIgDZtz183vRCkAqX5zQACgYKAQwSAQASFQHGX2Mi7o49wGh7KZYbLtP3RJfRohoVAUF8yKojw7lnoF-wr9FeruCysPW80076; HSID=AQarS-WobdHKM2V57; SSID=AQIG_V8s95lxxDRS6; APISID=WTAPc2XTUiUmQPyO/AKGf2PWT_jkaq9IVc; SAPISID=9ShJ0gj0ciA-Wl6M/AXjlzQqm1p1WjyFSM; __Secure-1PAPISID=9ShJ0gj0ciA-Wl6M/AXjlzQqm1p1WjyFSM; __Secure-3PAPISID=9ShJ0gj0ciA-Wl6M/AXjlzQqm1p1WjyFSM; NID=511=Wz0Gpl9-DZPH8tgUwZ6n27pZVQHe2fDbqVdukq57ZiHp0LlGc70YW8KScKfH-V7sO5Fni0_2mknlpj9MV8v-S2ZYB4KIks3YJagFrbmycfpuD7UcgHlMShTzjiVKeQcVIkFr41CpHhPqFnNrMUB2oTzrLNgNxVPjZBqWnFM-LEHrMI_8VYIHpXD_xcTFJAfA4yoQ9O90Ib7Zohvx-16WA7ldUIPSC-bKGZlNnomBzoKawjjmlqCBaYdRDfWo1lRgkZD-XKI5u64QaYyu2Jlw6QR1uzdTTJStuMOuZgXn-34EmDvB_REQ8DziZ3sra75OwXbBlFqFvoff0WU2HarOWE2RHLRIDsZ3v66owzSBa0ieiB3upnqn8rztE1ZpZbTPFhrSn9vlOENAoLF2XUCM-L5o84doDmLoNVWKH0QDwoWxSOzjIYT1-Kgb1WmLnFrNCmXaVhA_LQjpcuXtsPp3-IL-zeOtMY-7_oHDElFm2kqe-KrsYK6Sw3UZUuStfYuQG07lc51TcJBhiCk-G6aU_gRprIE8SfJugIjlTEfVGkTlJmDgd5ExI4UG7gXnxs26FL7cEwqpGq4n4asY72X_mpwyo2FHsbcBIKY_lQLdPuGaAU7rbpcx5pGN7U1zwxTbh1c06O8yBEnEGNWxtOeYG5hXLUc7K9XFXIXn; __Secure-1PSIDTS=sidts-CjEBYfD7Z-gysnWP9I-x62NUnQp5oy4nDqmVKu-dCYnyug10EOy7Vn1ENzoT8lu8WGAMEAA; __Secure-3PSIDTS=sidts-CjEBYfD7Z-gysnWP9I-x62NUnQp5oy4nDqmVKu-dCYnyug10EOy7Vn1ENzoT8lu8WGAMEAA; AEC=Ae3NU9OA2SunaeMjwOscuk3Z-UsLQ7r9fLU93l0Pm_O6slfRjD2cuL-uSao; __Secure-ENID=17.SE=LoCE65ZRyD0pJ1OOfsw_kfP0BY0rJMY2heG0DzmyckY2diwDzJZbpJSv8xv_ehsbtFxgGrfz2_Ms7Bh3-gFhPKz6YP0qTgGpxnxLfNllvugZGzsE6_Wb8QT0NB2UJ8DSdflPILAJe_V8XOh4BXoLlCEM99beBWHVTSqjrxyUxt0wN4NkRs6puhLIa_0_5N9b0_KaPR_7Rxer-xz4egCYX_GVVzGWTsJlWQjjNgZzR8iapEx136xluyxQThSL23qI4Sx8Ntctl76ebsP423lrEpVlEbAILMjJijoS_5w0doUQQHiUbyKTDbsTvZJZ_ZpXXNQzClhPb3d8gu6YM9GDqVH6dqcHakXcT6nJkXGAl4SiUDNtlGIPTMvlGGP8R51woaPSlQWRzDXm8zXgkiK7WJm8bakw7lNdj8Fz0YKkWbyxFr7npHvUant7raToMpNgsY4u; DV=E38o8QZnFfVUwMb7DvWOPzNS3vD53RiI-LVhLnx5tgAAAODRHY_HU_V4WgAAAAgH7s-UDNE6GAAAAHxNtg6drFzxEAAAAA; SIDCC=ABTWhQGWoVWrOpz0lchJmVRAJnxOK8OVwx4IF0PBTVC9rPqo5iBTt5RHwY3UlOh-idxZXXCBMw; __Secure-1PSIDCC=ABTWhQHuiF7ECvGCDm_O_9wZY8_s3j9HEzNaWqCmqqg27gg7EnG9clxL65JRjchJV0louQKlAf0; __Secure-3PSIDCC=ABTWhQEFaVm1QmmcfaWSTBDqranrH3RpgImIPyM0eyVxmDAEnPydQ1SWqeK_oBNi0cv74s93zg',

    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
    "x-client-data":
      "CJe2yQEIorbJAQipncoBCITnygEIk6HLAQjimM0BCIWgzQEIp+7NAQjd7s0BCIPwzQEIs/XNAQjq/M0BGKfqzQEYyfjNAQ==",
    }
    response = requests.get('https://www.google.com/search?q=ping-pong', headers=headers)
    html = BeautifulSoup(response.content, 'html.parser')
    
    titles = html.select('[role="heading"] > [role="link"]')
    
    for title in titles[:3]:
        title = title.get_text()
        print(title)

google()
