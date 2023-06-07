export interface loginModel {
  username: string;
  password: string;
}

export interface User{
  id:string,
  name:string,
  surname:string,
  username:string,
  password?:string,
  role:string
}