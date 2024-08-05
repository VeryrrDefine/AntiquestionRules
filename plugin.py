import http.server

methods=["GET","POST","HEAD"]

class BaseHTTPServerPlugin:
    def __init__(self, plugin_name: str, method: str, path: type(sum)) -> None:
        '''

        :param plugin_name: 插件名字
        :param method: 方法，只允许 HTTP 1.0提供的方法
        :param path: 路径，传入函数，参数x为路径，格式为"./11454/1919810/"，返回True或False
        '''
        assert method in methods, "Invaild Method"
        self.path_func = path
        self.method = method
        print("serverPlugin {0} Loaded".format(plugin_name))

    def on(self,handler:http.server.BaseHTTPRequestHandler):
        if not self.path_func(handler.path):
            return
        if handler.command != self.method:
            return
        return self.on_do(handler)
    def on_do(self,handler:http.server.BaseHTTPRequestHandler):
        pass

