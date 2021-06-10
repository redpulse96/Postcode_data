export interface CreateEROA_accountsDto {
  account_id?: string;
  account_postcode?: string;
  no_employees?: number;
  account_name?: string;
  account_type?: string;
  venue_account?: number;
}
export interface FetchEROA_accountsDetailsDto {
  id?: number;
  account_id?: string;
  account_postcode?: string;
  no_employees?: number;
  account_name?: string;
  account_type?: string;
  venue_account?: number;
}
