import {Module} from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
    providers: [AuthService, DiscordStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}