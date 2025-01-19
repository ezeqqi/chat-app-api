import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from '@/messages/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;
  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
