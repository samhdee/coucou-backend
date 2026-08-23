import {Module} from '@nestjs/common';
import {TimerController} from './timer.controller';
import {TimersService} from './timer.service';

@Module({
    controllers: [TimerController],
    providers: [TimersService],
})
export class TimersModule {
}