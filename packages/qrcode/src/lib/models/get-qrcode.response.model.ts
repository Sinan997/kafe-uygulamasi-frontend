import { BasicResponseModel } from 'theme-shared';

export interface GetQrcodeResponse extends BasicResponseModel {
  svg: string;
}
