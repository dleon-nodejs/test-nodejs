import * as yup from 'yup';

const codeExp = /^INS-+[0-9]{5}$/g;

export const materialSchema = yup.object().shape({
  code: yup.string().required().matches(codeExp, 'Invalid code'),
  name: yup.string().required().max(80),
  leadTimeDay: yup.number().min(0).max(999),
  purchaseUnitId: yup.number().required(),
  categoryId: yup.number().required(),
  price: yup.number().required().min(0).max(99999.99),
  priceService: yup.number().required().min(0).max(99999.99),
  verifiable: yup.boolean(),
});

export const materialChangeStatusSchema = yup.object().shape({
  status: yup.boolean().required(),
});

export const materialChangePriceSchema = yup.object().shape({
  price: yup.number().required().min(0).max(99999.99),
});

export const materialPaginetedSchema = yup.object().shape({
  page: yup.number().required(),
  limit: yup.number().required(),
  name: yup.string().max(80),
  code: yup.string().max(80),
  buyerEmail: yup.string().max(80).email(),
});
