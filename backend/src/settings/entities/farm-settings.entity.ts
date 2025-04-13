import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('farm_settings')
export class FarmSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'My Farm' })
  farmName: string;

  @Column({ nullable: true })
  farmLocation: string;

  @Column({ default: 'GMT' })
  timeZone: string;

  @Column({ default: 'Euro' })
  currency: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @Column({ nullable: true })
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 