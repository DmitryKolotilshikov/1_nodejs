import { Injectable } from '@nestjs/common';
import { users } from './data/users';
import { IUser } from './Models/User';
import { IUserQuery } from './Models/UserQuery';

const INFO_MESSAGE =
  'User data is missing or does not match the search and filter criteria';

@Injectable()
export class UsersService {
  getUsers(): IUser[] {
    return users;
  }

  getUserById(id: string): IUser {
    const resultUsers = users.find((user: IUser) => user.id === +id);

    if (!resultUsers) {
      throw new Error(INFO_MESSAGE);
    }

    return resultUsers;
  }

  getUserByQuery(query: IUserQuery): IUser[] {
    let resultUsers = users;

    if (query.fullname) {
      resultUsers = resultUsers.filter((user: IUser) => {
        return user.fullName
          .toLowerCase()
          .includes(query.fullname.toLowerCase());
      });
    }
    if (query.maxage) {
      resultUsers = resultUsers.filter((user: IUser) => {
        return user.age <= Number(query.maxage);
      });
    }
    if (query.minage) {
      resultUsers = resultUsers.filter((user: IUser) => {
        return user.age >= Number(query.minage);
      });
    }
    if (query.type) {
      resultUsers = resultUsers.filter((user: IUser) => {
        return user.type === query.type;
      });
    }
    if (query.limit) {
      resultUsers = resultUsers.slice(0, Number(query.limit));
    }

    return resultUsers;
  }
}
