import { Room } from 'src/chat-room/entities/room.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Generated } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(type => Room, room => room.members)
  @JoinTable()
  rooms: string[];
}