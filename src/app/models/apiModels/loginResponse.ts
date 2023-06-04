export interface loginResponse {
  accessToken: string;
  success: string;
  user: {
    username:string,
    role:string
  };
}
