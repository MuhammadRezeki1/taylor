import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 100, unique: true, name: 'key' }) key: string;
  @Column({ type: 'text', nullable: true, name: 'value' }) value: string;
  @UpdateDateColumn() updated_at: Date;
}