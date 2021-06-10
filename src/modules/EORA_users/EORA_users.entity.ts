import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EORA_users' })
export class EORA_users {
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
  public user_live_postcode?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public user_work_postcode?: string;
}
