import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  secretCode: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @CreateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}
