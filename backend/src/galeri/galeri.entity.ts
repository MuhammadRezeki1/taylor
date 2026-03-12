import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('galeri')
export class Galeri {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 200, nullable: true }) judul: string;
  @Column({ type: 'text', nullable: true }) deskripsi: string;
  @Column({ length: 500 }) url_gambar: string;
  @Column({ length: 100, default: 'umum' }) kategori: string;
  @Column({ default: 0 }) urutan: number;
  @Column({ default: 1 }) aktif: number;
  @CreateDateColumn() created_at: Date;
}