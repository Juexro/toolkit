import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createAt: string;

  @ManyToMany(type => User, user => user.rooms)
  members: string[];

  @ManyToOne(type => Room, room => room.messages)
  // @JoinColumn({ name: 'roomId' })
  room: Room;
}