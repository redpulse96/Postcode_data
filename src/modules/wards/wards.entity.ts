import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'wards' })
export class wards {
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
  public ward_ref?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public ward_name?: string;
}
