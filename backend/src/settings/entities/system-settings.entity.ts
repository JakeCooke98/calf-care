import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('system_settings')
export class SystemSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  autoBackup: boolean;

  @Column({ default: true })
  dataSyncEnabled: boolean;

  @Column({ default: true })
  emailNotifications: boolean;

  @Column({ default: 90 })
  dataRetentionDays: number;

  @Column({ default: false })
  darkModeEnabled: boolean;

  @Column({ default: 'en' })
  defaultLanguage: string;

  @Column({ type: 'json', nullable: true })
  notificationSettings: Record<string, any>;

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