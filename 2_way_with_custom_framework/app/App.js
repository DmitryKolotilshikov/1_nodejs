const http = require('http');
const EventEmitter = require('events');

class App {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    setController(controller) {
        const endpoints = controller.endpoints;

        Object.keys(endpoints).forEach(path => {
            const methods = endpoints[path]

            Object.keys(methods).forEach(method => {
                const handler = methods[method];

                this.emitter.on(`${path}:${method}`, (req, res) => {
                    handler(req, res);
                })
            })
        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            this.middlewares.forEach(middleware => middleware(req, res, this.emitter));
        });
    }
}

module.exports = App;