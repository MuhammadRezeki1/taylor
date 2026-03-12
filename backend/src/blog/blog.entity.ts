import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 400 }) judul: string;
  @Column({ length: 400, unique: true }) slug: string;
  @Column({ type: 'text', nullable: true }) ringkasan: string;
  @Column({ type: 'longtext', nullable: true }) konten: string;
  @Column({ length: 500, nullable: true }) gambar_cover: string;
  @Column({ length: 150, default: 'Buk Nining' }) penulis: string;
  @Column({ default: 0 }) published: number;
  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}