import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'postcode_data' })
export class PostCodes {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public postcode?: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public cty: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    default: 0,
  })
  public lat: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    default: 0,
  })
  public long: number;

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
  })
  public ward: string;

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
  })
  public laua: string;

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
  })
  public lep: string;

  @Column({
    type: 'binary',
    default: null,
    nullable: true,
  })
  public bid: string;
}
