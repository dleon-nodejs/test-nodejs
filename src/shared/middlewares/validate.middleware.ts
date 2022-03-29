import * as yup from 'yup';

export function validateMiddleware(request, next, opts: Record<string, yup.AnySchema>) {
  const { event } = request;

  try {
    const entries = Object.entries(opts);
    for (const entry of entries) {
      const [keyName, schema] = entry;
      schema.validateSync(event[keyName], { abortEarly: false });
    }
  } catch (err) {
    const { errors } = err;
    throw {
      statusCode: 400,
      message: { errors },
    };
  }
  return next();
}

/* istanbul ignore next */
export function validate(opts: Record<string, yup.AnySchema>) {
  return {
    before: (request, next) => validateMiddleware(request, next, opts),
  };
}
