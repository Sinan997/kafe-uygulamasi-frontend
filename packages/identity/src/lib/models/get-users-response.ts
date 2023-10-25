import { User } from './user';

export interface GetUsersResponse {
  users: User[];
  success: boolean;
}
