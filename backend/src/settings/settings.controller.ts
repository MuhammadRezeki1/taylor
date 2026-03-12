import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private svc: SettingsService) {}

  @Get() getAll() { return this.svc.getAll(); }
  @Get(':key') get(@Param('key') key: string) { return this.svc.get(key); }
  @Post() setMany(@Body() data: Record<string, string>) { return this.svc.setMany(data); }
  @Post(':key') set(@Param('key') key: string, @Body('value') value: string) { return this.svc.set(key, value); }
}