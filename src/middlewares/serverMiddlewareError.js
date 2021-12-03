/* eslint-disable no-unused-vars */
export default async function serverMiddlewareError(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.log('Middleware de erro: ', err);
  return res.sendStatus(500);
}
