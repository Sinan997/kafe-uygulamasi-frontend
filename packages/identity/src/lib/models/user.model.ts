export interface UserModel {
  _id: string;
  email: string;
  username: string;
  role: string;
  businessId: { _id: string; name: string };
}
