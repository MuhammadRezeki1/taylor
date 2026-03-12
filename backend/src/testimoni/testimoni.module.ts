import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimoni } from './testimoni.entity';
import { TestimoniService } from './testimoni.service';
import { TestimoniController } from './testimoni.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Testimoni])],
  providers: [TestimoniService],
  controllers: [TestimoniController],
})
export class TestimoniModule {}