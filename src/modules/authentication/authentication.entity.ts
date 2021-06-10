import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'authentication' })
export class authentication {
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
  public user_id?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public password?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public username?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public user_type?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public access_to?: string;
}
