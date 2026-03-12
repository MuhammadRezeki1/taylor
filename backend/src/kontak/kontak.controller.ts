import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { KontakService } from './kontak.service';
import { KontakMasuk } from './kontak.entity';

@Controller('kontak')
export class KontakController {
  constructor(private svc: KontakService) {}

  @Get() findAll() { return this.svc.findAll(); }
  @Post() create(@Body() data: Partial<KontakMasuk>) { return this.svc.create(data); }
  @Patch(':id/baca') markRead(@Param('id', ParseIntPipe) id: number) { return this.svc.markRead(id); }
}