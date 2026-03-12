import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('testimoni')
export class Testimoni {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 150 }) nama: string;
  @Column({ length: 100, nullable: true }) kota: string;
  @Column({ type: 'text' }) isi: string;
  @Column({ default: 5 }) bintang: number;
  @Column({ length: 300, nullable: true }) foto: string;
  @Column({ default: 1 }) aktif: number;
  @CreateDateColumn() created_at: Date;
}