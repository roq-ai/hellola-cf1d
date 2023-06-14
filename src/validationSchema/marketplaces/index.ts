import * as yup from 'yup';
import { auctionValidationSchema } from 'validationSchema/auctions';
import { productValidationSchema } from 'validationSchema/products';

export const marketplaceValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  auction: yup.array().of(auctionValidationSchema),
  product: yup.array().of(productValidationSchema),
});
