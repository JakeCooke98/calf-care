import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { FarmLocation } from '../../settings/entities/farm-location.entity';

export enum UserRole {
  FARM_MANAGER = 'farm_manager',
  VETERINARIAN = 'veterinarian',
  STAFF = 'staff',
  READ_ONLY = 'read_only',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF
  })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  // Temporarily comment out for seeding
  @OneToMany(() => FarmLocation, farmLocation => farmLocation.manager)
  managedLocations: FarmLocation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}