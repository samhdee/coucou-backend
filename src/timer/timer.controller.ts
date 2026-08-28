import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import {TimersService} from './timer.service';

@Controller('timer')
export class TimerController {
    constructor(private readonly timersService: TimersService) {
    }

    @Get('durations')
    getAllDurations() {
        return this.timersService.getAllDurations();
    }

    @Post()
    create(@Body('duration') duration: string) {
        const duration_number = parseInt(duration);

        const created = this.timersService.create(duration_number);

        this.timersService.storeTimerDuraction(duration_number);

        return created;
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string) {
        return this.timersService.findOne(uuid);
    }

    @Get()
    findAll() {
        return this.timersService.findAll();
    }
}