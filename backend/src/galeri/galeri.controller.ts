import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { GaleriService } from './galeri.service';
import { Galeri } from './galeri.entity';

@Controller('galeri')
export class GaleriController {
  constructor(private svc: GaleriService) {}

  @Get() findAll(@Query('kategori') kategori?: string) { return this.svc.findAll(kategori); }
  @Get(':id') findById(@Param('id', ParseIntPipe) id: number) { return this.svc.findById(id); }
  @Post() create(@Body() data: Partial<Galeri>) { return this.svc.create(data); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Galeri>) { return this.svc.update(id, data); }
  @Delete(':id') delete(@Param('id', ParseIntPipe) id: number) { return this.svc.delete(id); }
}