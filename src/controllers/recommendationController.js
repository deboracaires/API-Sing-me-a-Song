import * as recommendationService from '../services/recommendationService.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';

// eslint-disable-next-line consistent-return
async function newRecommendation(req, res) {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      return res.status(400).send('Precisa ter um nome e um link');
    }

    await recommendationService.verifyReqData(name, link);

    await recommendationRepository.create(name, link);

    return res.status(201).send('Recomendação criada!');
  } catch (err) {
    if (err.name === 'LinkError') return res.status(422).send(err.message);
    if (err.name === 'NameError') return res.status(400).send(err.message);
    if (err.name === 'LinkAlreadyRegisteredError') return res.status(409).send(err.message);
  }
}

export {
  newRecommendation,
};
