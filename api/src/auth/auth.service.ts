import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.name,
      sub: user.id,
      role: user.role,
      email: user.email,
      cpf: user.cpf,
      phoneNumber: user.phoneNumber,
    };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
