import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseInterface {
  id?: string;
  product_id: string;
  user_id: string;
  quantity: number;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PurchaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  user_id?: string;
}
