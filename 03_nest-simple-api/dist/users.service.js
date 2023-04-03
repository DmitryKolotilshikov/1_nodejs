"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_1 = require("./data/users");
const INFO_MESSAGE = 'User data is missing or does not match the search and filter criteria';
let UsersService = class UsersService {
    getUsers() {
        return users_1.users;
    }
    getUserById(id) {
        const resultUsers = users_1.users.find((user) => user.id === +id);
        if (!resultUsers) {
            throw new Error(INFO_MESSAGE);
        }
        return resultUsers;
    }
    getUserByQuery(query) {
        let resultUsers = users_1.users;
        if (query.fullname) {
            resultUsers = resultUsers.filter((user) => {
                return user.fullName
                    .toLowerCase()
                    .includes(query.fullname.toLowerCase());
            });
        }
        if (query.maxage) {
            resultUsers = resultUsers.filter((user) => {
                return user.age <= Number(query.maxage);
            });
        }
        if (query.minage) {
            resultUsers = resultUsers.filter((user) => {
                return user.age >= Number(query.minage);
            });
        }
        if (query.type) {
            resultUsers = resultUsers.filter((user) => {
                return user.type === query.type;
            });
        }
        if (query.limit) {
            resultUsers = resultUsers.slice(0, Number(query.limit));
        }
        return resultUsers;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map