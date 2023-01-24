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
  mattermost_admin?: UserAuthProfile
  mattermost_user1?:UserAuthProfile
  matrix_a?: UserAuthProfile
  matrix_admin?: UserAuthProfile
  matrix_user1?:UserAuthProfile
}
