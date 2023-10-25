import { User } from './user';

export interface addUserResponse {
  user: User;
  message: string;
  success: boolean;
}
