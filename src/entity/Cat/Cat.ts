import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "node_modules/typeorm";
import { User } from "src/entity/User";
import { CatFeed } from "src/entity/Cat/CatFeed";
import { CatKinds } from "src/entity/Cat/CatKinds";
import { CatWeight } from "./CatWeight";

export enum Gender {
  MALE = "male",
  FEMALE = "female"
}
@Entity()
export class Cat {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @ManyToOne(type => User, user => user.cats, { nullable: false })
  user: User;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: "enum", enum: Gender, default: Gender.MALE })
  gender: Gender;

  @ManyToOne(type => CatKinds, kinds => kinds.cats)
  kinds: CatKinds;

  @OneToMany(type => CatWeight, catweight => catweight.cat)
  weights: CatWeight[];

  @Column()
  neutering: boolean;

  @Column({ default: false })
  pregnant: boolean;

  @ManyToOne(type => CatFeed, feed => feed.cats)
  feed: CatFeed;

  @Column({ type: "decimal", nullable: true })
  ribcage: number;

  @Column({ type: "decimal", nullable: true })
  LIM: number;

  @Column({ nullable: true })
  BMI: number;

  @Column({ type: "date" })
  birth: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
