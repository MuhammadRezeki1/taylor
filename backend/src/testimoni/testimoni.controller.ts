import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TestimoniService } from './testimoni.service';
import { Testimoni } from './testimoni.entity';

@Controller('testimoni')
export class TestimoniController {
  constructor(private svc: TestimoniService) {}

  @Get()
  findAll(@Query('aktif') aktif?: string) {
    return this.svc.findAll(aktif === 'true' ? true : aktif === 'false' ? false : undefined);
  }

  @Get(':id') findById(@Param('id', ParseIntPipe) id: number) { return this.svc.findById(id); }
  @Post() create(@Body() data: Partial<Testimoni>) { return this.svc.create(data); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Testimoni>) { return this.svc.update(id, data); }
  @Delete(':id') delete(@Param('id', ParseIntPipe) id: number) { return this.svc.delete(id); }
}