import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private repo: Repository<Blog>) {}

  findAll(published?: boolean) {
    const where: any = {};
    if (published !== undefined) where.published = published ? 1 : 0;
    return this.repo.find({ where, order: { created_at: 'DESC' } });
  }

  async findBySlug(slug: string) {
    const item = await this.repo.findOne({ where: { slug } });
    if (!item) throw new NotFoundException('Artikel tidak ditemukan');
    return item;
  }

  async findById(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Artikel tidak ditemukan');
    return item;
  }

  create(data: Partial<Blog>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Blog>) {
    await this.findById(id);
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    await this.findById(id);
    await this.repo.delete(id);
    return { message: 'Artikel dihapus' };
  }
}