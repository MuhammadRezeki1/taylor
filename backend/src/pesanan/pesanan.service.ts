import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesanan } from './pesanan.entity';

@Injectable()
export class PesananService {
  constructor(@InjectRepository(Pesanan) private repo: Repository<Pesanan>) {}

  findAll(status?: string) {
    const where: any = {};
    if (status) where.status = status;
    return this.repo.find({ where, order: { created_at: 'DESC' } });
  }

  async findById(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Pesanan tidak ditemukan');
    return item;
  }

  create(data: Partial<Pesanan>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Pesanan>) {
    await this.findById(id);
    await this.repo.update(id, data);
    return this.findById(id);
  }
}