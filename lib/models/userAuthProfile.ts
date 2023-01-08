export interface UserAuthProfile {
  user: string;
  baseUrl:string,
  password?: string;
  asToken?: string;
  bearerToken?: string;
  domain?: string;
}

export interface UserAuthConfig {
  admin_mm?: UserAuthProfile
  matrix_a?: UserAuthProfile
}
