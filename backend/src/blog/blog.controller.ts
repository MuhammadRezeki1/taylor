import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private svc: BlogService) {}

  @Get() findAll(@Query('published') published?: string) {
    return this.svc.findAll(published === 'true' ? true : published === 'false' ? false : undefined);
  }
  @Get('slug/:slug') findBySlug(@Param('slug') slug: string) { return this.svc.findBySlug(slug); }
  @Get(':id') findById(@Param('id', ParseIntPipe) id: number) { return this.svc.findById(id); }
  @Post() create(@Body() data: Partial<Blog>) { return this.svc.create(data); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Blog>) { return this.svc.update(id, data); }
  @Delete(':id') delete(@Param('id', ParseIntPipe) id: number) { return this.svc.delete(id); }
}