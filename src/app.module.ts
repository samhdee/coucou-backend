import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { TimerController } from './timer/timer.controller';

@Module({
    imports: [],
    controllers: [AppController, TimerController],
    providers: [AppService],
})
export class AppModule {
}
