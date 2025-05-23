import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Calf {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column('float')
  weight: number;

  @Column()
  health: string;

  @Column({ nullable: true })
  breed: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ default: false })
  inWatchlist: boolean;

  @Column({ nullable: true })
  location: string;

  @Column({ default: true })
  isAlive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
