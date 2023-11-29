export interface DecodedUserTokenModel {
  _id: string;
  email: string;
  username: string;
  role: string;
  businessId: string;
  exp: number;
  iat: number;
}
