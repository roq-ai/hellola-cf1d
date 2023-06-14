import * as yup from 'yup';

export const purchaseValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  product_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
