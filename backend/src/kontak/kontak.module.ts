import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KontakMasuk } from './kontak.entity';
import { KontakService } from './kontak.service';
import { KontakController } from './kontak.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KontakMasuk])],
  providers: [KontakService],
  controllers: [KontakController],
})
export class KontakModule {}