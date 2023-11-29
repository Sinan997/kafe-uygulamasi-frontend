export interface UserModel {
  _id: string;
  email: string;
  username: string;
  password?: string;
  role: string;
  businessId: { _id: string; name: string };
}
