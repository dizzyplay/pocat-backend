import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "node_modules/typeorm";
import { Cat } from "src/entity/Cat/Cat";

@Entity()
export class CatWeight {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Cat, cat => cat.weights)
  cat: Cat;

  @Column({ type: "decimal" })
  weight: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
