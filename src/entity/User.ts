import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn
} from "typeorm";
import { Cat } from "src/entity/Cat/Cat";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  secretCode: string;

  @Column({ default: false })
  activation: boolean;

  @OneToMany(type => Cat, cat => cat.user)
  cats: Cat[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
