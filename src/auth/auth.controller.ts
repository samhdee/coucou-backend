import {
    Controller,
    Get,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('discord')
export class AuthController {
    constructor(private jwtService: JwtService) {}

    @Get('')
    @UseGuards(AuthGuard('discord'))
    discordLogin() {} // redirige vers Discord

    @Get('auth')
    @UseGuards(AuthGuard('discord'))
    async discordCallback(@Req() req, @Res() res) {
        const token = this.jwtService.sign({ sub: req.user.id, username: req.user.username });
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    }

    @Get('auth/me')
    @UseGuards(AuthGuard('jwt'))
    getMe(@Req() req) {
        return req.user; // { userId, username } issu du payload JWT
    }
}

