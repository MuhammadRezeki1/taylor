import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PesananService } from './pesanan.service';
import { Pesanan } from './pesanan.entity';

@Controller('pesanan')
export class PesananController {
  constructor(private svc: PesananService) {}

  @Get() findAll(@Query('status') status?: string) { return this.svc.findAll(status); }
  @Get(':id') findById(@Param('id', ParseIntPipe) id: number) { return this.svc.findById(id); }
  @Post() create(@Body() data: Partial<Pesanan>) { return this.svc.create(data); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Pesanan>) {
    return this.svc.update(id, data);
  }
}