import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { LayananService } from './layanan.service';
import { Layanan } from './layanan.entity';

@Controller('layanan')
export class LayananController {
  constructor(private svc: LayananService) {}

  @Get()
  findAll(@Query('aktif') aktif?: string) {
    return this.svc.findAll(aktif === 'true' ? true : aktif === 'false' ? false : undefined);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) { return this.svc.findById(id); }

  @Post()
  create(@Body() data: Partial<Layanan>) { return this.svc.create(data); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Layanan>) {
    return this.svc.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) { return this.svc.delete(id); }
}