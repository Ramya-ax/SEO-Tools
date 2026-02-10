from http.client import HTTPSConnection
from base64 import b64encode
from json import loads, dumps

class RestClient:
    domain = "api.dataforseo.com"

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def get(self, path):
        connection = HTTPSConnection(self.domain)
        auth = f"{self.username}:{self.password}"
        headers = {
            'Authorization': 'Basic %s' % b64encode(auth.encode()).decode(),
            'Content-Type': 'application/json'
        }

        connection.request('GET', path, headers=headers)
        response = connection.getresponse()
        result = loads(response.read().decode())
        connection.close()
        return result

    def post(self, path, data):
        connection = HTTPSConnection(self.domain)
        auth = f"{self.username}:{self.password}"
        headers = {
            'Authorization': 'Basic %s' % b64encode(auth.encode()).decode(),
            'Content-Type': 'application/json'
        }

        post_data = dumps(data).encode('utf8')
        connection.request('POST', path, body=post_data, headers=headers)
        response = connection.getresponse()
        result = loads(response.read().decode())
        connection.close()
        return result
