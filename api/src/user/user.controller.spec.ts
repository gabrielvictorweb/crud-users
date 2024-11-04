import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { adminMock, userMock, userServiceMock } from './user.service.mock';
import { RoleGuard } from '../auth/role.guard';
import { Role } from './dtos/create-user';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all user', async () => {
    const result = await controller.getAllUsers();
    expect(result).toContain(userMock);
  });

  it('should get user', async () => {
    const result = await controller.getUser(userMock.id);
    expect(result).toEqual(userMock);
  });

  it('should create user', async () => {
    const result = await controller.saveUser(
      { ...userMock, role: Role.USER },
      {
        user: { userId: adminMock.id },
      },
    );
    expect(result).toEqual(userMock);
  });

  it('should update user', async () => {
    const result = await controller.updateUser(
      { ...userMock, role: Role.USER },
      userMock.id,
      {
        user: { userId: adminMock.id },
      },
    );
    expect(result).toEqual(userMock);
  });

  it('should update user status to active', async () => {
    const result = await controller.updateStatusUser(
      { status: true },
      userMock.id,
      {
        user: { userId: adminMock.id },
      },
    );
    expect(result).toEqual(userMock);
  });

  it('should update user status to disabled', async () => {
    const result = await controller.updateStatusUser(
      { status: false },
      userMock.id,
      {
        user: { userId: adminMock.id },
      },
    );
    expect(result).toEqual(userMock);
  });

  it('should return profile of user authenticated', async () => {
    const result = await controller.getProfile({
      user: { userId: adminMock.id },
    });
    expect(result).toEqual(userMock);
  });
});
