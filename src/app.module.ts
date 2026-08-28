import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TimersModule } from './timer/timer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, TimersModule, AuthModule],
})
export class AppModule {}