import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  user: string;

  @Column({ length: 500 })
  message: string;

  @Column({ length: 100 })
  avatar: string;
}