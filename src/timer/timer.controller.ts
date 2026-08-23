import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {TimersService} from './timer.service';

@Controller('timer')
export class TimerController {
    constructor(private readonly timersService: TimersService) {
    }

    @Post()
    create(@Body('duration') duration: number) {
        const created = this.timersService.create(duration);

        this.timersService.storeTimerDuraction(duration);

        return created;
    }

    @Get()
    findAll() {
        return this.timersService.findAll();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string) {
        return this.timersService.findOne(uuid);
    }
}