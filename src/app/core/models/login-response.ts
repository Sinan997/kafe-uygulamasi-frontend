export interface loginResponse {
  accessToken: string;
  success: boolean;
  user: {
    username:string,
    role:string
  };
}
