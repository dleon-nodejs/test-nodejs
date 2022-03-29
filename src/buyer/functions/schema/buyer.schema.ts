import * as yup from 'yup';

const phoneExp = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}-?[0-9]{4}$/g;

export const buyerSchema = yup.object().shape({
  name: yup.string().required().max(80),
  email: yup.string().email().required().max(80),
  phone: yup.string().matches(phoneExp, { message: 'Invalid phone number', excludeEmptyString: true }),
});

export const buyerStatusSchema = yup.object().shape({
  status: yup.boolean().required(),
});
