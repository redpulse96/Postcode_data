export interface CreateEORA_venuesDto {
  venue_id?: string;
  venue_postcode?: string;
  account_id?: string;
  no_employees?: number;
  culture_venue?: number;
  sport_venue?: number;
  high_street_venue?: number;
  charity_venue?: number;
  family_venue?: number;
  tourist_venue?: number;
}
export interface FetchEORA_venuesDetailsDto {
  id?: number;
  venue_id?: string;
  venue_postcode?: string;
  account_id?: string;
  no_employees?: number;
  culture_venue?: number;
  sport_venue?: number;
  high_street_venue?: number;
  charity_venue?: number;
  family_venue?: number;
  tourist_venue?: number;
}
