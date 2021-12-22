export interface TokenResponse {
  token: string;
}

export interface ErrorResponse {
  error: string;
}
export enum AuthType {
  LOGIN = 'login',
  SIGNUP = 'signup'
}

export interface IResWithUser {
  user: IUser;
}

export interface IUser {
  id: string;
  username: string;
}

export interface IProduct {
  /** The product id */
  id: string;
  /** The id of the user who created the product */
  userId: string;
  /** The name of the product */
  name: string;
  /** additional details */
  details: { [key: string]: any };
  /** The price of the product */
  price: number;
  /** The quantity of the product */
  quantity: number;
  inStock: boolean;

}
