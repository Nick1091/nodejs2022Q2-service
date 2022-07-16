import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VERSIONS } from 'src/constants';
import { User } from './entities/user.entity';
import { IPostUser, IUpdatePassword, IUsersStart } from './users.interface';

@Injectable()
export class UserService {
  private static users: Array<IUsersStart> = [];

  async create(user: { login: string; password: string }): Promise<IPostUser> {
    const newUser: IUsersStart = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: VERSIONS.FIRST,
    };
    const u = new User(newUser);
    UserService.users.push(new User(newUser));
    return u;
  }

  async findAll(): Promise<IPostUser[]> {
    return UserService.users.map((user: IUsersStart) => user);
  }

  async findOne(id: string): Promise<IPostUser> {
    const oneUser = UserService.users.find((user: IUsersStart) => {
      return id === user.id;
    });
    if (!oneUser) {
      throw new NotFoundException('User not found.');
    }
    return oneUser;
  }

  async update(id: string, data: IUpdatePassword): Promise<IUsersStart> {
    const index: number = UserService.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found.');
    }
    const password: boolean = UserService.users.some(
      (item) => item.password === data.oldPassword && item.id === id,
    );
    if (!password) {
      throw new ForbiddenException('Old Pasword is wrong');
    }
    const newUser: IUsersStart = {
      ...UserService.users[index],
      password: data.newPassword,
      version: UserService.users[index].version + 1,
      updatedAt: Date.now(),
    };
    UserService.users.splice(index, 1, new User(newUser));
    return new User(newUser);
  }

  async remove(id: string): Promise<void> {
    const index: number = UserService.users.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found.');
    }
    UserService.users.splice(index, 1);
  }
}
