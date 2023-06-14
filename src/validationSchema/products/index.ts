import * as yup from 'yup';
import { auctionValidationSchema } from 'validationSchema/auctions';
import { purchaseValidationSchema } from 'validationSchema/purchases';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  marketplace_id: yup.string().nullable().required(),
  auction: yup.array().of(auctionValidationSchema),
  purchase: yup.array().of(purchaseValidationSchema),
});
