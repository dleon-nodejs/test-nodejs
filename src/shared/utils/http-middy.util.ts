import { httpMiddyDefaults } from '@moblybr/middy-defaults';
import httpResponseSerializer from '@sharecover-co/middy-http-response-serializer';

const optionsOffiline = {
  errorHandler: {
    customLogger: (handler) => console.error(handler.error),
  },
};

const offline = process.env.IS_OFFLINE ? optionsOffiline : {};

export function httpMiddyfy<T>(handler: T, serializer = true) {
  const handle = httpMiddyDefaults(handler, offline);
  if (serializer) {
    return handle.use(httpResponseSerializer());
  }
  return handle;
}
