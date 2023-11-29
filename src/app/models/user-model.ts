export interface LoginModel {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  password?: string;
  role: string;
  businessId: { _id: string; name: string };
}
