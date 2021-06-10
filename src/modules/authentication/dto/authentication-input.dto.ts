export interface CreateauthenticationDto {
  user_id?: string;
  password?: string;
  username?: string;
  user_type?: string;
  access_to?: string;
}
export interface FetchauthenticationDetailsDto {
  id?: number;
  user_id?: string;
  password?: string;
  username?: string;
  user_type?: string;
  access_to?: string;
}
