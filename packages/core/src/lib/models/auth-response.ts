import { BasicResponseModel } from './basic-response.model';

export interface AuthResponse extends BasicResponseModel {
  accessToken: string;
  refreshToken: string;
}
