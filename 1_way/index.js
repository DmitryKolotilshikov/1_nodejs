const http = require('http');
const users = require('./data/users.js');

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

const INFO_MESSAGE = 'User data is missing or does not match the search and filter criteria';

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    if (req.url === '/users') {
        return res.end(JSON.stringify(users))
    };

    const url_params = new URLSearchParams(req.url, `http://localhost:${PORT}`);
    const [query, value] = Array.from(url_params)[0];

    req.on('data', (chunk) => {
        console.log(JSON.parse(chunk))
    });

    const response = (data) => {
        if (data.length === 0) {
            res.end(INFO_MESSAGE);
        } else {
            res.end(JSON.stringify(data));
        }
    }

    switch (true) {
        case query.includes('fullname'):
            const filteredByFullName = users.filter(user => user.fullName.toLowerCase().includes(value.toLowerCase()));
            return response(filteredByFullName);
        case query.includes('maxage'):
            const filteredByMaxAge = users.filter(user => user.age <= value);
            return response(filteredByMaxAge);
        case query.includes('minage'):
            const filteredByMinAge = users.filter(user => user.age >= value);
            return response(filteredByMinAge);
        case query.includes('type'):
            const filteredByType = users.filter(user => user.type.toLowerCase().includes(value.toLowerCase()));
            return response(filteredByType);
        case query.includes('limit'):
            const filteredByLimit = users.slice(0, Number(value));
            return response(filteredByLimit);
        default: 
            return res.end('Not Found');
    }
});

server.listen(PORT, HOSTNAME, () => console.log(`Server run on port ${PORT} :)`));