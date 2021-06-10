import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'local_authorities' })
export class local_authorities {
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
  public laua_ref?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public laua_name?: string;
}
