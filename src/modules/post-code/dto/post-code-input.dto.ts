export interface CreatePostCodesDto {
  Pcds?: string;
  cty: string;
  lat: number;
  long: number;
  ward: string;
  laua: string;
  lep1: string;
  bid?: string;
}
export interface FetchPostCodeDetailsDto {
  id?: string;
  Pcds?: string;
  cty?: string;
  lat?: number;
  long?: number;
  ward?: string;
  laua?: string;
  lep1?: string;
  bid?: string;
}
