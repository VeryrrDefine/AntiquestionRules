import http.server
import json
import os

import markdown
import requests
import urllib.parse

from plugin import BaseHTTPServerPlugin

import t01

class StaticFile(BaseHTTPServerPlugin):
    def __init__(self):
        super().__init__("StaticFile", "GET", lambda x: True)

    def on_do(self, handler: t01.RequestHandlerImpl):
        directory = ""
        eeterwrtt = handler.path
        is_dir = False
        if os.path.isdir(handler.path):
            if not handler.path.endswith('/'):
                handler.path += '/'
            directory = handler.path
            handler.path += "index.html"
            is_dir = True
            print(eeterwrtt)
            if not eeterwrtt[-1] == "/":
                print("http://" + urllib.parse.unquote(handler.headers["Host"]) + directory+"/")
                handler.send_response_by_plugin(301)
                handler.send_header("Content-Type", "text/html; charset=utf-8")
                handler.send_header("Access-Control-Allow-Origin", "*")
                handler.send_header("Location", "http://" + urllib.parse.quote(handler.headers["Host"] + directory))
                handler.end_headers()
                handler.wfile.write(handler.get_file("./errors/404.html"))
                return True
        if not os.path.exists(handler.path):

            if is_dir:
                files = os.listdir(directory)
                directory = directory[1:]
                if not eeterwrtt[-1] == "/":
                    print("http://" + urllib.parse.quote(handler.headers["Host"]) + directory)
                    handler.send_response_by_plugin(301)
                    handler.send_header("Content-Type", "text/html; charset=utf-8")
                    handler.send_header("Access-Control-Allow-Origin", "*")
                    handler.send_header("Location", "http://" + urllib.parse.quote(handler.headers["Host"] + directory))
                    handler.end_headers()
                    handler.wfile.write(handler.get_file("./errors/404.html"))
                    return True

                output = f"<h1>Index of {directory}</h1><hr>"
                output += "<p><a href=\"..\">..</a></p>"
                for i in files:
                    output += f"<p><a href=\"{directory}{i}\">{i}</a></p>"
                handler.send_response_by_plugin(200)
                handler.send_header("Content-Type", "text/html; charset=utf-8")
                handler.send_header("Access-Control-Allow-Origin", "*")
                handler.end_headers()
                handler.wfile.write((output).encode("utf-8"))
                return True
            handler.send_response_by_plugin(404)
            handler.send_header("Content-Type", "text/html; charset=utf-8")
            handler.send_header("Access-Control-Allow-Origin", "*")
            handler.end_headers()
            handler.wfile.write(handler.get_file("./errors/404.html"))
            return True
        mimetype = handler.get_mimetype(handler.path)

        if mimetype.startswith('audio/'):
            handler.response_headers.update({"Accept-Ranges": "bytes"})
        handler.send_response_by_plugin(200)
        handler.response_headers.update({"Content-Type": mimetype + ";"})
        handler.response_headers.update({"Access-Control-Allow-Origin": "*"})
        handler.send_header_by_dict(handler.response_headers)
        handler.end_headers()
        handler.wfile.write(
            handler.get_file(handler.path).replace(b"$$$$$$$9699---*&$*(#%&*)@&%*^&#)&%*)#)^9898989,status is IP?",
                                                   handler.client_address[0].encode("utf-8")))
        return True
