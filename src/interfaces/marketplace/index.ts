import { AuctionInterface } from 'interfaces/auction';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MarketplaceInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  auction?: AuctionInterface[];
  product?: ProductInterface[];
  user?: UserInterface;
  _count?: {
    auction?: number;
    product?: number;
  };
}

export interface MarketplaceGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
