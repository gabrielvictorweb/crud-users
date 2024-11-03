import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { authParams, authServiceMock, tokenMock } from './auth.service.mock';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
        }),
      ],
      providers: [authServiceMock, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign in', async () => {
    const result = await controller.login({ user: authParams });
    expect(result).toEqual(tokenMock);
    expect(controller).toBeDefined();
  });
});
