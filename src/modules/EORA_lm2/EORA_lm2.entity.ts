import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EORA_lm2' })
export class EORA_lm2 {
  @PrimaryColumn()
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  public id?: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public redeemed_user_id?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public voucher_id?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public redeemed_venue_id?: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 4,
    default: 0,
  })
  public lm2_transaction_amount: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  public first_visit_outside_EORA?: number;
}
