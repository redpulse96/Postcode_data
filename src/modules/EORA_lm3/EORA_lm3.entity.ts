import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EORA_lm3' })
export class EORA_lm3 {
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
    type: 'int',
    width: 100,
    default: null,
  })
  public voucher_qty: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 4,
    default: 0,
  })
  public lm3_impact_value: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  public lm3_creation_date?: Date;
}
