import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {PrismaMariaDb} from '@prisma/adapter-mariadb';
import {PrismaClient} from '../../generated/prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const adapter = new PrismaMariaDb({
            host: process.env.DB_HOST ?? '127.0.0.1',
            port: Number(process.env.DB_PORT ?? 3306),
            user: process.env.DB_USER ?? 'user',
            password: process.env.DB_PASSWORD ?? 'mot_de_passe',
            database: process.env.DB_NAME ?? 'db_name',
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