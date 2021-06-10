import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bid_names' })
export class bid_names {
  @PrimaryColumn()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  public id?: number;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public bid_name?: string;
}
