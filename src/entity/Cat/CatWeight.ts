import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "node_modules/typeorm";
import { Cat } from "src/entity/Cat/Cat";

@Entity()
export class CatWeight extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Cat, cat => cat.weights, { onDelete: "CASCADE" })
  cat: Cat;

  @Column({ type: "decimal" })
  weight: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
