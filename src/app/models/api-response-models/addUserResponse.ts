import { User } from "../userModel";

export interface addUserResponse{
  user:User,
  message:string,
  success:boolean
}