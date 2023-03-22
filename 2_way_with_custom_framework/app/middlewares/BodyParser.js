const MESSAGE = require('../../constants');

const BodyParser = (req, res, emitter) => {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        if (body) {
            req.body = JSON.parse(body);
        }

        if (emitter) {
            const emitted = emitter.emit(`${req.pathname}:${req.method}`, req, res);

            if (!emitted) res.end(MESSAGE.INFO_MESSAGE);
        }
    })
}

module.exports = BodyParser;