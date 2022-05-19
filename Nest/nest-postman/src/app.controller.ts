import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('r')
  @Redirect('https://google.com', HttpStatus.MOVED_PERMANENTLY)

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
