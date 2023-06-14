import * as yup from 'yup';
import { bidValidationSchema } from 'validationSchema/bids';

export const auctionValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  product_id: yup.string().nullable().required(),
  marketplace_id: yup.string().nullable().required(),
  bid: yup.array().of(bidValidationSchema),
});
