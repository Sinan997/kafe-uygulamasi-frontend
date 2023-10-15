export interface LoginResponse {
  accessToken: string;
  success: boolean;
  user: {
    username:string,
    role:string
  };
}
