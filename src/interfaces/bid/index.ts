import { AuctionInterface } from 'interfaces/auction';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BidInterface {
  id?: string;
  amount: number;
  auction_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  auction?: AuctionInterface;
  user?: UserInterface;
  _count?: {};
}

export interface BidGetQueryInterface extends GetQueryInterface {
  id?: string;
  auction_id?: string;
  user_id?: string;
}
