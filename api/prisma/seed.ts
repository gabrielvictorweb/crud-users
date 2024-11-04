import { PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from '../src/auth/jwt.strategy';

const prisma = new PrismaClient();
async function main() {
  const userMock = {
    address: 'Rua John Doe, n° 777 - São Paulo - SP',
    birthday: new Date(),
    email: 'admin@admin.com',
    cpf: '0000000000',
    password: bcrypt.hashSync('password', SALT_OR_ROUNDS),
    name: 'Admin',
    phoneNumber: '999999999',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.ADMIN,
  } as User;

  await prisma.user.upsert({
    where: { email: userMock.email },
    update: userMock,
    create: userMock,
  });

  console.log('[+] Created user admin');
}

const UsersSeeder = async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

UsersSeeder();
