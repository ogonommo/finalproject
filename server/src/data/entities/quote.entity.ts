import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  movie: string;
}
