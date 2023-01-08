export interface UserAuthProfile {
  user: string;
  baseURL:string,
  password?: string;
  asToken?: string;
  bearerToken?: string;
  domain?: string;
}

export interface UserAuthConfig {
  admin_mm?: UserAuthProfile
  matrix_a?: UserAuthProfile
}
