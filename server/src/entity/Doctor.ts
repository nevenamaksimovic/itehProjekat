import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Ordination } from "./Ordination";

@Entity()
export class Doctor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @ManyToOne(() => Ordination)
  ordination: Ordination;
}