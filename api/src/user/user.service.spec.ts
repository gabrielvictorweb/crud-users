import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { adminMock, userMock } from './user.service.mock';
import { faker } from '@faker-js/faker';

describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(UserService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('List all users', async () => {
    const testUsers = [userMock];

    prisma.user.findMany.mockResolvedValueOnce(testUsers);

    const users = await service.getAllUsers();
    expect(users).toEqual(testUsers);
  });

  it('Get user by id', () => {
    const testUsers = userMock;

    prisma.user.findUnique.mockResolvedValueOnce(testUsers);

    expect(service.getUserById(userMock.id)).resolves.toBe(testUsers);
  });

  it('find user by email', () => {
    const testUser = userMock;

    prisma.user.findUnique.mockResolvedValueOnce(testUser);

    expect(service.getUserByEmail(testUser.email)).resolves.toBe(testUser);
  });

  it('find user by email', async () => {
    const testUser = userMock;

    prisma.user.findUnique.mockResolvedValueOnce(testUser);

    const user = await service.getUserById(testUser.id);
    expect(user).toEqual(testUser);
  });

  it('create user', async () => {
    const testUser = userMock;

    prisma.user.create.mockResolvedValueOnce(testUser);
    prisma.userLogsAccount.create.mockResolvedValueOnce({
      id: faker.string.uuid(),
      action: 'CREATED',
      userIdOwner: adminMock.id,
      userIdTarget: userMock.id,
    });

    const user = await service.saveUser(testUser, {
      action: 'CREATED',
      userIdOwner: adminMock.id,
      userIdTarget: userMock.id,
    });

    expect(user).toEqual(testUser);
  });

  it('update user', async () => {
    const testUser = userMock;

    prisma.user.update.mockResolvedValueOnce(testUser);
    prisma.userLogsAccount.create.mockResolvedValueOnce({
      id: faker.string.uuid(),
      action: 'UPDATED',
      userIdOwner: adminMock.id,
      userIdTarget: userMock.id,
    });

    const user = await service.updateUser(testUser, {
      action: 'UPDATED',
      userIdOwner: adminMock.id,
      userIdTarget: userMock.id,
    });

    expect(user).toEqual(testUser);
  });

  it('activate user status', async () => {
    const testUser = userMock;

    prisma.user.update.mockResolvedValueOnce(testUser);
    prisma.userLogsAccount.create.mockResolvedValueOnce({
      id: faker.string.uuid(),
      action: 'UPDATED',
      userIdOwner: adminMock.id,
      userIdTarget: userMock.id,
    });

    const user = await service.updateStatusUser(
      { status: true },
      {
        action: 'UPDATED',
        userIdOwner: adminMock.id,
        userIdTarget: userMock.id,
      },
    );

    expect(user).toEqual(testUser);
  });

  it('disable user status', async () => {
    const testUser = userMock;

    prisma.user.update.mockResolvedValueOnce(testUser);
    prisma.userLogsAccount.create.mockResolvedValueOnce({
      id: faker.string.uuid(),
      action: 'DELETED',
      userIdOwner: adminMock.id,
      userIdTarget: userMock.id,
    });

    const user = await service.updateStatusUser(
      { status: false },
      {
        action: 'DELETED',
        userIdOwner: adminMock.id,
        userIdTarget: userMock.id,
      },
    );

    expect(user).toEqual(testUser);
  });
});
