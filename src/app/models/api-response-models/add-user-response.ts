import { User } from "../user-model";

export interface addUserResponse{
  user:User,
  message:string,
  success:boolean
}