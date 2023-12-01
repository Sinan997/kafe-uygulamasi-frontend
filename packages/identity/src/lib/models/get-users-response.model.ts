import { UserModel } from './user.model';
import { BasicResponseModel } from 'theme-shared';

export interface GetUsersResponse extends BasicResponseModel {
  users: UserModel[];
}
