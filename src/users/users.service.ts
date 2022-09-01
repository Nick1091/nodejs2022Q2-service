import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ERRORS_MSGS, VERSIONS } from 'src/constants';
import { Users } from './entities/user.entity';
import { IUpdatePassword } from './users.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { comparePassword, setHashPassword } from 'src/common/utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await setHashPassword(createUserDto.password),
      },
    });

    user.createdAt = user.updatedAt;
    return plainToInstance(Users, user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToInstance(Users, user));
  }

  async findOne(id: string) {
    const oneUser = await this.prisma.user.findFirst({ where: { id } });
    if (!oneUser) {
      throw new NotFoundException(ERRORS_MSGS.USER.USER_NOT_FOUND);
    }
    return plainToInstance(Users, oneUser);
  }

  async update(id: string, data: IUpdatePassword) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(ERRORS_MSGS.USER.USER_NOT_FOUND);
    }
    if (!(await comparePassword(data.oldPassword, user.password))) {
      throw new ForbiddenException(ERRORS_MSGS.USER.PASSWORD_WRONG);
    }
    const hash = await setHashPassword(data.newPassword);
    const newUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hash,
        version: { increment: VERSIONS.FIRST },
      },
    });
    return plainToInstance(Users, newUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(ERRORS_MSGS.USER.USER_NOT_FOUND);
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
