import zerorpc


class Hello:
    def hello(self, name):
        print(name)
        return "Hello {}".format(name)


s = zerorpc.Server(Hello())
s.bind("tcp://0.0.0.0:4242")
s.run()
