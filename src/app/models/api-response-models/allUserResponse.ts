import { User } from "../userModel";

export interface allUserResponse{
  users:User[],
  success:boolean
}