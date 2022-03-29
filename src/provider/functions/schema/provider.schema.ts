import * as yup from 'yup';

const phoneExp = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}-?[0-9]{4}$/g;

export const providerSchema = yup.object().shape({
  codeErp: yup.string().required().min(1).max(10),
  name: yup.string().required().min(1).max(80),
  document: yup.string().required().min(1).max(40),
  foreignDocument: yup.boolean(),
  brands: yup.array().max(80),
  leadTimeDay: yup.number().min(0).max(999),
  shipping: yup.number().required(),
  products: yup.array().required().max(80),
  contact: yup.string().min(1).max(80),
  phone: yup.string().matches(phoneExp, { message: 'Invalid phone number', excludeEmptyString: true }),
  email: yup.string().email().required().max(80),
  region: yup.string().required().min(1).max(80),
  paymentTerm: yup.string().min(1).max(80),
  paymentMethod: yup.string().min(1).max(40),
  ipi: yup.number(),
  icms: yup.number(),
  bank: yup.string().max(80),
  account: yup.string().max(80),
});

export const providerChangeStatusSchema = yup.object().shape({
  status: yup.boolean().required(),
});
