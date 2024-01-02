import { BusinessModel } from './business.model'
import { BasicResponseModel } from 'theme-shared';

export interface GetBusinessesResponse extends BasicResponseModel {
  businesses: BusinessModel[];
}
