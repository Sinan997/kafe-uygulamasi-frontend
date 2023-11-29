import { UserModel } from './user.model';

export interface AddUserModel {
  email: string;
  username: string;
  password: string;
  role: string;
  businessName?: string;
}

export interface AddUserResponseModel {
  user: UserModel;
  message: string;
  success: boolean;
}
