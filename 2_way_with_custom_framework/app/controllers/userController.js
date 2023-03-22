const Controller = require('../Controller');
const users = require('../../data/users');
const MESSAGE = require('../../constants');

const userController = new Controller();

userController.get('/users', (req, res) => {
    const params = req.params;

    if (!Object.keys(params).length) {
        return res.send(users);
    }

    let returnUsers = users;
    let maxCount;

    for(const key in params) {
        if (key === 'limit') {
            maxCount = params[key];
            continue;
        }

        switch(true) {
            case key === 'fullname':
                returnUsers = returnUsers.filter(user => user.fullName.toLowerCase().includes(params[key]));
                break;
            case key === 'maxage':
                returnUsers = returnUsers.filter(user => user.age <= params[key]);
                break;
            case key === 'minage':
                returnUsers = returnUsers.filter(user => user.age >= params[key]);
                break;
            case key === 'type':
                returnUsers = returnUsers.filter(user => user.type.toLowerCase().includes(params[key]));
                break;
        }
    }

    if (maxCount) {
        returnUsers = returnUsers.slice(0, maxCount);
    }

    res.send(returnUsers);
});

userController.post('/users', (req, res) => {
    if (!req.body) {
        return res.send(MESSAGE.INFO_MESSAGE);
    }

    users.push(req.body);
    res.send();
});

module.exports = userController;