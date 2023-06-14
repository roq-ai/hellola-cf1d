import { BidInterface } from 'interfaces/bid';
import { ProductInterface } from 'interfaces/product';
import { MarketplaceInterface } from 'interfaces/marketplace';
import { GetQueryInterface } from 'interfaces';

export interface AuctionInterface {
  id?: string;
  start_time: any;
  end_time: any;
  product_id: string;
  marketplace_id: string;
  created_at?: any;
  updated_at?: any;
  bid?: BidInterface[];
  product?: ProductInterface;
  marketplace?: MarketplaceInterface;
  _count?: {
    bid?: number;
  };
}

export interface AuctionGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  marketplace_id?: string;
}
