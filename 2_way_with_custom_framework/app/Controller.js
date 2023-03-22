class Controller {
    constructor() {
        this.endpoints = {};
    }

    request(path, method, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }

        const endpoints = this.endpoints[path];

        if (endpoints[method]) {
            throw new Error('Such method already exists');
        }

        endpoints[method] = handler;
    }

    get(path, handler) {
        this.request(path, 'GET', handler);
    }

    post(path, handler) {
        this.request(path, 'POST', handler);
    }
}

module.exports = Controller;