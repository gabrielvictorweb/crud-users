import { Role, User } from '@prisma/client';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from '../auth/jwt.strategy';
import { faker } from '@faker-js/faker';

export const mockPasswordUserTextPlain = 'password';

export const userMock = {
  address:
    'Avenida Alameda das Travessas, nº 111, Edifício Bosque do Cerrado, apartamento 2222 - Bairro dos Barris. CEP: 40000-000. Salvador - Bahia.',
  birthday: new Date(),
  email: 'user@user.com',
  cpf: '0000000000',
  password: bcrypt.hashSync(mockPasswordUserTextPlain, SALT_OR_ROUNDS),
  name: 'John Doe',
  id: faker.string.uuid(),
  phoneNumber: '999999999',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  role: Role.USER,
} as User;

export const adminMock = {
  address:
    'Avenida Alameda das Travessas, nº 111, Edifício Bosque do Cerrado, apartamento 2222 - Bairro dos Barris. CEP: 40000-000. Salvador - Bahia.',
  birthday: new Date(),
  email: 'admin@admin.com',
  cpf: '0000000000',
  password: bcrypt.hashSync(mockPasswordUserTextPlain, SALT_OR_ROUNDS),
  name: 'John Doe',
  id: faker.string.uuid(),
  phoneNumber: '999999999',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  role: Role.ADMIN,
} as User;

export const userServiceMock = {
  provide: UserService,
  useValue: {
    getAllUsers: jest.fn().mockResolvedValue([userMock]),
    getUser: jest.fn().mockResolvedValue(userMock),
    getUserByEmail: jest.fn().mockResolvedValue(userMock),
    updateUser: jest.fn().mockResolvedValue(userMock),
    updateStatusUser: jest.fn().mockResolvedValue(userMock),
    saveUser: jest.fn().mockResolvedValue(userMock),
    getUserById: jest.fn().mockResolvedValue(userMock),
    getProfile: jest.fn().mockResolvedValue(userMock),
  },
};
