import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { randomUUID } from "crypto";
import {DateTime} from "luxon";

import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class TimersService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(duration: number) {
        const endDate = DateTime.now()
            .setZone('Europe/Paris')
            .plus(duration * 60 * 1000);

        return this.prisma.timer.create({
            data: {
                uuid: randomUUID(),
                endTime: endDate.toJSDate()
            },
        });
    }

    async findAll() {
        return this.prisma.timer.findMany({
            orderBy: {createdAt: 'desc'},
        });
    }

    async findOne(uuid: string) {
        const timer = await this.prisma.timer.findFirst({
            where: {uuid},
        });

        if (!timer) {
            throw new NotFoundException(`Timer "${uuid}" introuvable.`);
        }

        return timer;
    }

    async storeTimerDuraction(duration: number) {
        if (duration == 0) {
            return;
        }

        const past_timer = await this.prisma.pastTimers.findFirst({
            where: {duration},
        });

        if (past_timer) {
            return;
        }

        await this.prisma.pastTimers.create({
            data: {duration}
        });
    }

    async getAllDurations() {
        return this.prisma.pastTimers.findMany({
            select: {duration: true},
            orderBy: {duration: 'asc'}
        })
    }
}