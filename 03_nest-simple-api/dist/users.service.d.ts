import { IUser } from './Models/User';
import { IUserQuery } from './Models/UserQuery';
export declare class UsersService {
    getUsers(): IUser[];
    getUserById(id: string): IUser;
    getUserByQuery(query: IUserQuery): IUser[];
}
