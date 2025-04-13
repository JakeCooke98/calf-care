import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('farm_locations')
export class FarmLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  capacity: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Temporarily comment out relationship for seeding
  @ManyToOne(() => User, user => user.managedLocations, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  @Column({ nullable: true })
  managerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 