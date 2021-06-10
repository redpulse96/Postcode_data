export interface CreateEORA_lm1sDto {
  account_id?: string;
  impact_account_id?: string;
  voucher_id?: string;
  lm1_impact_value: number;
  lm1_creation_date?: string;
  voucher_qty?: number;
  claimed_user_id?: string;
  voucher_expiry_date: Date;
  voucher_claim_date: Date;
  vouchers_remaining?: number;
}
export interface FetchEORA_lm1DetailsDto {
  id?: number;
  account_id?: string;
  impact_account_id?: string;
  voucher_id?: string;
  lm1_impact_value: number;
  lm1_creation_date?: string;
  voucher_qty?: number;
  claimed_user_id?: string;
  voucher_expiry_date: Date;
  voucher_claim_date: Date;
  vouchers_remaining?: number;
}
