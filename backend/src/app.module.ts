import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { Layanan } from './layanan/layanan.entity';
import { Testimoni } from './testimoni/testimoni.entity';
import { Pesanan } from './pesanan/pesanan.entity';
import { KontakMasuk } from './kontak/kontak.entity';
import { Galeri } from './galeri/galeri.entity';
import { Blog } from './blog/blog.entity';
import { Setting } from './settings/settings.entity';

import { LayananModule } from './layanan/layanan.module';
import { TestimoniModule } from './testimoni/testimoni.module';
import { PesananModule } from './pesanan/pesanan.module';
import { KontakModule } from './kontak/kontak.module';
import { GaleriModule } from './galeri/galeri.module';
import { BlogModule } from './blog/blog.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get('DB_HOST', 'localhost'),
        port: +cfg.get('DB_PORT', 3306),
        username: cfg.get('DB_USERNAME', 'root'),
        password: cfg.get('DB_PASSWORD', ''),
        database: cfg.get('DB_DATABASE', 'jahit_buknining'),
        entities: [Layanan, Testimoni, Pesanan, KontakMasuk, Galeri, Blog, Setting],
        synchronize: false,
        charset: 'utf8mb4',
      }),
    }),
    LayananModule,
    TestimoniModule,
    PesananModule,
    KontakModule,
    GaleriModule,
    BlogModule,
    SettingsModule,
  ],
})
export class AppModule {}