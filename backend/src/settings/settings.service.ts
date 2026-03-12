import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './settings.entity';

@Injectable()
export class SettingsService {
  constructor(@InjectRepository(Setting) private repo: Repository<Setting>) {}

  async getAll(): Promise<Record<string, string>> {
    const all = await this.repo.find();
    return all.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
  }

  async get(key: string): Promise<string> {
    const item = await this.repo.findOne({ where: { key } });
    return item?.value ?? '';
  }

  async set(key: string, value: string) {
    const existing = await this.repo.findOne({ where: { key } });
    if (existing) {
      await this.repo.update(existing.id, { value });
    } else {
      await this.repo.save(this.repo.create({ key, value }));
    }
    return { key, value };
  }

  async setMany(data: Record<string, string>) {
    for (const [key, value] of Object.entries(data)) {
      await this.set(key, value);
    }
    return this.getAll();
  }
}