/* eslint-disable no-useless-escape */
import LinkError from '../errors/LinkError.js';
import NameError from '../errors/NameError.js';
import LinkAlreadyRegisteredError from '../errors/LinkAlreadyRegisteredError.js';

import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function verifyReqData(name, link) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

  if (!regExp.test(link)) {
    throw new LinkError('Link inválido');
  }
  if (typeof (name) !== 'string') {
    throw new NameError('Nome inválido, deve ser uma string');
  }

  const checkLink = await recommendationRepository.select(link);

  if (checkLink !== false) {
    throw new LinkAlreadyRegisteredError('Link já recomendado');
  }

  return true;
}

export {
  verifyReqData,
};
