import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TimersModule } from './timer/timer.module';

@Module({
  imports: [PrismaModule, TimersModule],
})
export class AppModule {}