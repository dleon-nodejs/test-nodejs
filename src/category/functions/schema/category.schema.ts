import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup.string().required().max(50),
  description: yup.string().max(140),
});

export const categoryChangeStatusSchema = yup.object().shape({
  status: yup.boolean().required(),
});
