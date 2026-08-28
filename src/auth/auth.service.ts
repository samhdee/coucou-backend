import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async findOrCreateFromDiscord(profile: any) {
        return this.prisma.user.upsert({
            where: { discordId: profile.id },
            update: { username: profile.username, avatar: profile.avatar },
            create: {
                discordId: profile.id,
                username: profile.username,
                avatar: profile.avatar,
                email: profile.email,
            },
        });
    }
}