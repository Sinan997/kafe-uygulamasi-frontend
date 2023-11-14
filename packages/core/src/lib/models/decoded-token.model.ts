export interface DecodedTokenModel{
  id: string;
  role: string;
  name: string;
  surname: string;
  username: string;
  businessId: string;
  exp: number;
  iat: number;
}