import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EORA_venues' })
export class EORA_venues {
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
  public venue_id?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public venue_postcode?: string;

  @Column({
    type: 'varchar',
    length: 100,
    default: null,
  })
  public account_id?: string;

  @Column({
    type: 'int',
    width: 100,
    default: null,
  })
  public no_employees?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  public culture_venue?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  public sport_venue?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  public high_street_venue?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  public charity_venue?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  public family_venue?: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
  })
  public tourist_venue?: number;
}
