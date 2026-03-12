import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimoni } from './testimoni.entity';

@Injectable()
export class TestimoniService {
  constructor(@InjectRepository(Testimoni) private repo: Repository<Testimoni>) {}

  findAll(aktif?: boolean) {
    const where: any = {};
    if (aktif !== undefined) where.aktif = aktif ? 1 : 0;
    return this.repo.find({ where, order: { created_at: 'DESC' } });
  }

  async findById(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Testimoni tidak ditemukan');
    return item;
  }

  create(data: Partial<Testimoni>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Testimoni>) {
    await this.findById(id);
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    await this.findById(id);
    await this.repo.delete(id);
    return { message: 'Testimoni dihapus' };
  }
}