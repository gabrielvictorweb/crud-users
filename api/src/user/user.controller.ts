import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { Role, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { StatusUserDto } from './dtos/status-user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get profile infos from user authenticated',
  })
  async getProfile(@Request() req) {
    const data = await this.userService.getUserById(req.user.userId);

    if (data) {
      data.cpf = data?.cpf?.replace(/^.{6}/g, '000000');
      delete data?.password;
    }

    return data;
  }

  @Get()
  @ApiOperation({
    summary: 'Get All Users (Only ADMIN)',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one Users (Only ADMIN)',
  })
  async getUser(@Param('id') id): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create User (ADMIN)',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async saveUser(@Body() body: CreateUserDto, @Request() req): Promise<User> {
    return await this.userService.saveUser(body, {
      action: 'UPDATED',
      userIdOwner: req.user.userId,
      userIdTarget: null,
    });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update User (Only ADMIN)',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateUser(
    @Body() body: CreateUserDto,
    @Param('id') id,
    @Request() req,
  ): Promise<User> {
    return await this.userService.updateUser(body, {
      action: 'UPDATED',
      userIdOwner: req.user.userId,
      userIdTarget: id,
    });
  }

  @Patch('status/:id')
  @ApiOperation({
    summary: 'Update User',
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateStatusUser(
    @Body() body: StatusUserDto,
    @Param('id') id,
    @Request() req,
  ): Promise<User> {
    const action = body.status ? 'UPDATED' : 'DELETED';

    return await this.userService.updateStatusUser(body, {
      action,
      userIdOwner: req.user.userId,
      userIdTarget: id,
    });
  }
}
