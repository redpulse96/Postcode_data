import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'leps' })
export class leps {
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
  public lep_ref?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public lep_name?: string;
}
