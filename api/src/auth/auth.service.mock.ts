import { userMock } from '../user/user.service.mock';
import { AuthService } from './auth.service';
import { AuthPostDto } from './dtos/auth-post-dto';

export const authParams = {
  password: '',
  username: '',
} as AuthPostDto;

export const tokenMock = { access_token: '' };

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    validateUser: jest.fn().mockResolvedValue(userMock),
    login: jest.fn().mockResolvedValue(tokenMock),
  },
};
