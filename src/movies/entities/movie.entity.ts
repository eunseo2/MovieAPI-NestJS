//type orm 써야함
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn() //auto
  id?: number;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  year: number;
  @Column()
  genres: string;
}
