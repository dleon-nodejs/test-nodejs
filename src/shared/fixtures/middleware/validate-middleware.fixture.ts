import * as yup from 'yup';

export const payloadSucessedCreateUserMock = {
  id: '1',
  login: 'fakelogin',
  name: 'fakename',
  email: 'email@fake.com.br',
  password: 'asdf1KKkj',
};

export const payloadFailedCreateUserMock = {
  login: 'fakelogin',
  name: 'fakename',
  password: 'asdf1KKkj',
};

export const userSchemaMock = yup.object().shape({
  name: yup.string().required().min(3).max(250),
  login: yup.string().required().min(3).max(50),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(50)
    .matches(/^(?=.*[A-Z-z])(?=.*\d)(?=.*)[A-Za-z\d@$!%*#?&]{8,}$/),
});
