import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('kontak_masuk')
export class KontakMasuk {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 150 }) nama: string;
  @Column({ length: 200, nullable: true }) email: string;
  @Column({ length: 20, nullable: true }) no_hp: string;
  @Column({ type: 'text' }) pesan: string;
  @Column({ default: 0 }) sudah_dibaca: number;
  @CreateDateColumn() created_at: Date;
}