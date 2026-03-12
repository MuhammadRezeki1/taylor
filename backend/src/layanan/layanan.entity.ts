import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('layanan')
export class Layanan {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 200 }) nama: string;
  @Column({ type: 'text', nullable: true }) deskripsi: string;
  @Column({ default: 0 }) harga_mulai: number;
  @Column({ length: 100, nullable: true }) icon: string;
  @Column({ default: 0 }) urutan: number;
  @Column({ default: 1 }) aktif: number;
  @CreateDateColumn() created_at: Date;
}