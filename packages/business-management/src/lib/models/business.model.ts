export interface BusinessModel {
  _id: string;
  name: string;
  ownerId: { username: string; email: string };
}
