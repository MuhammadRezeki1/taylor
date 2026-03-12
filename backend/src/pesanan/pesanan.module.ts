import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pesanan } from './pesanan.entity';
import { PesananService } from './pesanan.service';
import { PesananController } from './pesanan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pesanan])],
  providers: [PesananService],
  controllers: [PesananController],
})
export class PesananModule {}