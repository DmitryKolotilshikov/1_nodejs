import { IUser } from './Models/User';
import { IUserQuery } from './Models/UserQuery';
import { UsersService } from './users.service';
export declare class AppController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserByParams(query: IUserQuery): IUser[];
    getUserById(id: string): IUser;
}
