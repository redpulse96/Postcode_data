export interface CreateEORA_lm3sDto {
  account_id?: string;
  impact_account_id?: string;
  voucher_id?: string;
  voucher_qty?: number;
  lm3_impact_value?: number;
  lm3_creation_date?: Date;
}
export interface FetchEORA_lm3DetailsDto {
  id?: number;
  account_id?: string;
  impact_account_id?: string;
  voucher_id?: string;
  voucher_qty?: number;
  lm3_impact_value?: number;
  lm3_creation_date?: Date;
}
