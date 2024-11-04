import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot({
      errorMessage: () =>
        `Você fez muitas tentativas, tente novamente em ${Number(process.env.THROTTLE_BLOCKDURATION) / 60000}`,
      throttlers: [
        {
          ttl: Number(process.env.THROTTLE_TTL),
          limit: Number(process.env.THROTTLE_LIMIT),
          blockDuration: Number(process.env.THROTTLE_BLOCKDURATION),
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
