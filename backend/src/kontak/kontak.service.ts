import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KontakMasuk } from './kontak.entity';

@Injectable()
export class KontakService {
  constructor(@InjectRepository(KontakMasuk) private repo: Repository<KontakMasuk>) {}

  findAll() { return this.repo.find({ order: { created_at: 'DESC' } }); }
  create(data: Partial<KontakMasuk>) { return this.repo.save(this.repo.create(data)); }
  async markRead(id: number) {
    await this.repo.update(id, { sudah_dibaca: 1 });
    return { message: 'Ditandai sudah dibaca' };
  }
}