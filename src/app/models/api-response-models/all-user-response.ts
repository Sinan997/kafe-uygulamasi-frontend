import { User } from "../user-model";

export interface allUserResponse{
  users:User[],
  success:boolean
}