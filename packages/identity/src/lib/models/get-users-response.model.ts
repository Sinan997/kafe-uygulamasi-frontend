import { UserModel } from './user.model';

export interface GetUsersResponse {
  users: UserModel[];
  success: boolean;
}
