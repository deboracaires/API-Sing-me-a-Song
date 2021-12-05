/* eslint-disable consistent-return */
import * as recommendationService from '../services/recommendationService.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

async function newRecommendation(req, res, next) {
  try {
    const { name, link } = req.body;

    if (!name || !link) return res.status(400).send('Precisa ter um nome e um link');

    await recommendationService.verifyReqData(name, link);

    await recommendationRepository.create(name, link);

    return res.status(201).send('Recomendação criada!');
  } catch (err) {
    if (err.name === 'LinkError') return res.status(422).send(err.message);
    if (err.name === 'NameError') return res.status(400).send(err.message);
    if (err.name === 'LinkAlreadyRegisteredError') return res.status(409).send(err.message);
    next(err);
  }
}

async function upVote(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!id) return res.status(400).send('Precisa ter um id');

    await recommendationService.verifyId(id);

    const result = await recommendationRepository.increaseScore(id);

    return res.status(201).send(result);
  } catch (err) {
    if (err.name === 'InvalidIdError') return res.status(400).send(err.message);
    if (err.name === 'IdNotFoundError') return res.status(404).send(err.message);
    next(err);
  }
}

async function downVote(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!id) return res.status(400).send('Precisa ter um id');

    const newScore = await recommendationService.decreaseScore(id);

    if (newScore === false) return res.sendStatus(201);

    await recommendationRepository.decreaseScore(id, newScore);

    return res.sendStatus(201);
  } catch (err) {
    if (err.name === 'InvalidIdError') return res.status(400).send(err.message);
    if (err.name === 'IdNotFoundError') return res.status(404).send(err.message);
    next(err);
  }
}

export {
  newRecommendation,
  upVote,
  downVote,
};
