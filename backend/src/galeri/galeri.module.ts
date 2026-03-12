import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galeri } from './galeri.entity';
import { GaleriService } from './galeri.service';
import { GaleriController } from './galeri.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Galeri])],
  providers: [GaleriService],
  controllers: [GaleriController],
})
export class GaleriModule {}