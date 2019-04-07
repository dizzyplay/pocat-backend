import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "node_modules/typeorm";
import { Cat } from "src/entity/Cat/Cat";

@Entity()
export class CatFeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "decimal" })
  kcal: number;

  @OneToMany(type => Cat, cat => cat.feed)
  cats: Cat[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
