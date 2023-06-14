import * as yup from 'yup';

export const bidValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  auction_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
