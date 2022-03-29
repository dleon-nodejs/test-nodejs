import createHttpError from 'http-errors';

type ErrorOptions = {
  code: number;
  message: string;
};

export function throwError({ code, message }: ErrorOptions) {
  throw new createHttpError[code](message);
}
