import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('health_statuses')
export class HealthStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'gray' })
  color: string;

  @Column({ default: false })
  requiresAttention: boolean;

  @Column({ default: false })
  isEmergency: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 