import { AuctionInterface } from 'interfaces/auction';
import { PurchaseInterface } from 'interfaces/purchase';
import { MarketplaceInterface } from 'interfaces/marketplace';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  marketplace_id: string;
  created_at?: any;
  updated_at?: any;
  auction?: AuctionInterface[];
  purchase?: PurchaseInterface[];
  marketplace?: MarketplaceInterface;
  _count?: {
    auction?: number;
    purchase?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  marketplace_id?: string;
}
