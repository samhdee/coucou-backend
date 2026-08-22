import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {PrismaMariaDb} from '@prisma/adapter-mariadb';
import {PrismaClient} from '../../prisma/generated/prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const adapter = new PrismaMariaDb({
            host: process.env.DATABASE_HOST ?? 'localhost',
            port: Number(process.env.DATABASE_PORT ?? 3306),
            user: process.env.DATABASE_USER ?? 'timer_user',
            password: process.env.DATABASE_PASSWORD ?? 'mot_de_passe',
            database: process.env.DATABASE_NAME ?? 'timer_db',
            connectionLimit: 5,
        });

        super({adapter});
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}