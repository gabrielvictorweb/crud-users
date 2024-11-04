import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy, SALT_OR_ROUNDS } from './jwt.strategy';
import { tokenMock } from './auth.service.mock';
import {
  mockPasswordUserTextPlain,
  userMock,
  userServiceMock,
} from '../user/user.service.mock';
import { jwtServiceMock } from './jwt.service.mock';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userServiceMock,
        jwtServiceMock,
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user credentials success', async () => {
    const response = await service.validateUser(
      userMock.email,
      mockPasswordUserTextPlain,
    );
    expect(response).toEqual(userMock);
  });

  it('should return user credentials error', async () => {
    userMock.password = bcrypt.hashSync(
      mockPasswordUserTextPlain,
      SALT_OR_ROUNDS,
    );

    const response = await service.validateUser(
      userMock.email,
      'wrong password',
    );
    expect(response).toEqual(null);
  });

  it('should return null to user not found', async () => {
    userServiceMock.useValue.getUserByEmail = jest.fn().mockResolvedValue(null);

    const response = await service.validateUser(
      userMock.email,
      'wrong password',
    );
    expect(response).toEqual(null);
  });

  it('should sign in', async () => {
    const response = await service.login(userMock);
    expect(response).toEqual(tokenMock);
  });
});
