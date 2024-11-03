/* istanbul ignore file */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      email: payload.email,
      cpf: payload.cpf,
      phoneNumber: payload.phoneNumber,
      userConfirmation: payload.userConfirmation,
      profileInvestor: payload.profileInvestor,
    };
  }
}

export const SALT_OR_ROUNDS = 10;
