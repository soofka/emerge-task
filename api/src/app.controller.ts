import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppEvent } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEvents(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('level') level?: number,
  ): AppEvent[] {
    return this.appService.getEvents(from, to, level);
  }
}
