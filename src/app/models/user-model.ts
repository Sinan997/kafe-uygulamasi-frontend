export interface LoginModel {
  username: string;
  password: string;
}

export interface User{
  _id:string,
  name:string,
  surname:string,
  username:string,
  password?:string,
  role:string
}