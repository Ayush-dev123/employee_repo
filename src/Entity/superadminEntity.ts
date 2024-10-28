import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class super_admin_table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  status: string;

}
