/* eslint-disable no-useless-escape */
import { validateUrl } from 'youtube-validate';

import LinkError from '../errors/LinkError.js';
import NameError from '../errors/NameError.js';
import LinkAlreadyRegisteredError from '../errors/LinkAlreadyRegisteredError.js';
import InvalidIdError from '../errors/InvalidIdError.js';
import IdNotFoundError from '../errors/IdNotFoundError.js';

import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function verifyReqData(name, link) {
  await validateUrl(link)
    .catch(() => {
      throw new LinkError('Link inválido');
    });

  if (typeof (name) !== 'string') {
    throw new NameError('Nome inválido, deve ser uma string');
  }

  const checkLink = await recommendationRepository.selectByLink(link);

  if (checkLink !== false) {
    throw new LinkAlreadyRegisteredError('Link já recomendado');
  }

  return true;
}

async function verifyId(id) {
  if (id < 1) throw new InvalidIdError('Id inválido!');

  const checkId = await recommendationRepository.selectById(id);

  if (checkId === false) throw new IdNotFoundError('Não há link registrado nesse id!');

  return true;
}

async function decreaseScore(id) {
  if (id < 1) throw new InvalidIdError('Id inválido!');

  const recommendation = await recommendationRepository.selectById(id);

  if (recommendation === false) throw new IdNotFoundError('Não há link registrado nesse id!');

  let score = Number(recommendation.score);

  if (score === -5) {
    await recommendationRepository.deleteRecommendation(id);
    return false;
  }

  score -= 1;

  return score;
}

export {
  verifyReqData,
  verifyId,
  decreaseScore,
};
