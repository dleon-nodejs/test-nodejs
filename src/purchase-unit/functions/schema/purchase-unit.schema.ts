import * as yup from 'yup';

export const purchaseUnitSchema = yup.object().shape({
  name: yup.string().required().max(10),
  description: yup.string().max(140),
});

export const purchaseUnitChangeStatusSchema = yup.object().shape({
  status: yup.boolean().required(),
});
