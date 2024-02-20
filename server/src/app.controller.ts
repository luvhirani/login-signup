import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} //This shorthand allows us to both declare and initialize the catsService member immediately in the same location.

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
