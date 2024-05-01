export interface NotificationModel {
  tableName: string;
  productName: string;
  businessId: string;
  isRead: boolean;
  quantity: number;
}

export interface DecodedUserTokenModel {
  _id: string;
  email: string;
  username: string;
  role: string;
  businessId: { _id: string; name: string };
  exp: number;
  iat: number;
  notifications: NotificationModel[];
}
