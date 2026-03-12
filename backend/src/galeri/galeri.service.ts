import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galeri } from './galeri.entity';

@Injectable()
export class GaleriService {
  constructor(@InjectRepository(Galeri) private repo: Repository<Galeri>) {}

  findAll(kategori?: string) {
    const where: any = { aktif: 1 };
    if (kategori) where.kategori = kategori;
    return this.repo.find({ where, order: { urutan: 'ASC' } });
  }

  async findById(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Galeri tidak ditemukan');
    return item;
  }

  create(data: Partial<Galeri>) { return this.repo.save(this.repo.create(data)); }

  async update(id: number, data: Partial<Galeri>) {
    await this.findById(id);
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    await this.findById(id);
    await this.repo.delete(id);
    return { message: 'Galeri dihapus' };
  }
}