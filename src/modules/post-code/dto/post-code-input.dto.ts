export interface CreatePostCodesDto {
  postcode?: string;
  cty: string;
  lat: number;
  long: number;
  ward: string;
  laua: string;
  lep: string;
  bid: string;
}
export interface FetchPostCodeDetailsDto {
  postcode?: string;
  cty?: string;
  lat?: number;
  long?: number;
  ward?: string;
  laua?: string;
  lep?: string;
  bid?: string;
}
