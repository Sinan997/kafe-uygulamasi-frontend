export interface BusinessModel {
  _id: string;
  name: string;
  categories: [];
  waiters: [];
  email: string;
  ownerId: {
    _id: string;
    username: string;
    email: string;
    role: string;
    businessId: string;
  };
}
