import * as yup from 'yup';

export const productionPhaseSchema = yup.object().shape({
  name: yup.string().required().max(20),
  description: yup.string().max(140),
});

export const productionPhaseChangeStatusSchema = yup.object().shape({
  status: yup.boolean().required(),
});
