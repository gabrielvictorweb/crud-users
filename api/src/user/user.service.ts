import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusUserDto } from './dtos/status-user';
import { LogAccountData } from './user.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    return await this.prismaService.user.findMany();
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async getUserById(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async saveUser(data: Prisma.UserCreateInput, logAccountData: LogAccountData) {
    const user = await this.prismaService.user.create({
      data,
    });

    await this.prismaService.userLogsAccount.create({
      data: { ...logAccountData, userIdTarget: user.id },
    });

    return user;
  }

  async updateUser(
    data: Prisma.UserCreateInput,
    logAccountData: LogAccountData,
  ) {
    const user = await this.prismaService.user.update({
      where: { id: logAccountData.userIdTarget },
      data,
    });

    await this.prismaService.userLogsAccount.create({
      data: logAccountData,
    });

    return user;
  }

  async updateStatusUser(data: StatusUserDto, logAccountData: LogAccountData) {
    const deletedAt = !data.status ? new Date() : undefined;

    const user = await this.prismaService.user.update({
      where: { id: logAccountData.userIdTarget },
      data: {
        deletedAt,
      },
    });

    await this.prismaService.userLogsAccount.create({
      data: logAccountData,
    });

    return user;
  }
}
