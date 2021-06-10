import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EROA_accounts' })
export class EROA_accounts {
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
  public account_id?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public account_postcode?: string;

  @Column({
    type: 'int',
    width: 100,
    default: null,
  })
  public no_employees?: number;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public account_name?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public account_type?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  public venue_account?: number;
}
