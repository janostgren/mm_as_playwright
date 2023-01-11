export interface UserAuthProfile {
  user: string;
  baseURL:string,
  password?: string;
  asToken?: string;
  bearerToken?: string;
  domain?: string;
  additional?:any
}

export interface UserAuthConfig {
  admin_mm?: UserAuthProfile
  mattermost_a?:UserAuthProfile
  matrix_a?: UserAuthProfile
  matrix_user1?:UserAuthProfile
}
