import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { InterventionItem } from "./InterventionItem";
import { User } from "./User";


@Entity()
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => User)
  user: User;


  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected', 'finished']
  })
  status: 'pending' | 'accepted' | 'rejected' | 'finished';

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime', nullable: true })
  end?: Date;

  @OneToMany(() => InterventionItem, item => item.intervention)
  items: InterventionItem[];
}