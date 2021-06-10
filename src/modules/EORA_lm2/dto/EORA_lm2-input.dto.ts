export interface CreateEORA_lm2sDto {
  redeemed_user_id?: string;
  voucher_id?: string;
  redeemed_venue_id?: string;
  lm2_transaction_amount?: number;
  first_visit_outside_EORA?: string;
}
export interface FetchEORA_lm2DetailsDto {
  id?: number;
  redeemed_user_id?: string;
  voucher_id?: string;
  redeemed_venue_id?: string;
  lm2_transaction_amount?: number;
  first_visit_outside_EORA?: string;
}
