import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EORA_lm1' })
export class EORA_lm1 {
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
  public account_id?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public impact_account_id?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public voucher_id?: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 4,
    default: 0,
  })
  public lm1_impact_value: number;

  @Column({
    type: 'datetime',
  })
  public lm1_creation_date?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  public voucher_qty?: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public claimed_user_id?: string;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public voucher_expiry_date: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public voucher_claim_date: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  public vouchers_remaining?: number;
}
