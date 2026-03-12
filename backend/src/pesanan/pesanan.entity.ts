import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pesanan')
export class Pesanan {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 150 }) nama_pelanggan: string;
  @Column({ length: 20 }) no_hp: string;
  @Column({ length: 200, nullable: true }) email: string;
  @Column({ type: 'text', nullable: true }) alamat: string;
  @Column({ length: 200, nullable: true }) jenis_layanan: string;
  @Column({ type: 'text', nullable: true }) deskripsi_pesanan: string;
  @Column({ type: 'enum', enum: ['baru','diproses','selesai','dibatalkan'], default: 'baru' }) status: string;
  @Column({ type: 'text', nullable: true }) catatan_admin: string;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}