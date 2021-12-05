/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */

import * as recommendationRepository from '../src/repositories/recommendationRepository.js';
import * as recommendationService from '../src/services/recommendationService.js';

import InvalidIdError from '../src/errors/InvalidIdError.js';
import IdNotFoundError from '../src/errors/IdNotFoundError';
import LinkError from '../src/errors/LinkError';
import NameError from '../src/errors/NameError.js';
import LinkAlreadyRegisteredError from '../src/errors/LinkAlreadyRegisteredError.js';
import RecommendationEmptyError from '../src/errors/RecommendationEmptyError.js';

import { clearDatabase, closeConnection } from './utils/database.js';

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

describe('Recommendation service', () => {
  // verifyReqData
  it('Should throws a LinkError when an invalid Link is given', async () => {
    const promise = recommendationService.verifyReqData('valid name', 'invalid link');
    await expect(promise).rejects.toThrowError(LinkError);
  });
  it('Should throws a NameError when an invalid name is given', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const promise = recommendationService.verifyReqData(12, validLink);
    await expect(promise).rejects.toThrowError(NameError);
  });
  it('Should throws a LinkAlreadyRegistered when the given link is already registered', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    await recommendationRepository.create(validName, validLink);
    const promise = recommendationService.verifyReqData(validName, validLink);
    await expect(promise).rejects.toThrowError(LinkAlreadyRegisteredError);
  });
  it('Should returns true when the request is valid and not already registered', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    const promise = await recommendationService.verifyReqData(validName, validLink);
    expect(promise).toBe(true);
  });
  // verifyId
  it('Should throws an InvalidIdError when an invalid id is given', async () => {
    const promise = recommendationService.verifyId(-2);
    await expect(promise).rejects.toThrowError(InvalidIdError);
  });
  it('Should throws an IdNotFoundError when the given id is not registered', async () => {
    const promise = recommendationService.verifyId(1);
    await expect(promise).rejects.toThrowError(IdNotFoundError);
  });
  it('Should returns true when the requested id is valid and registered', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    const result = await recommendationRepository.create(validName, validLink);
    const promise = await recommendationService.verifyId(result[0].id);
    expect(promise).toBe(true);
  });

  // decreaseScore
  it('Should throws an InvalidIdError when an invalid id is given', async () => {
    const promise = recommendationService.decreaseScore(-2);
    await expect(promise).rejects.toThrowError(InvalidIdError);
  });
  it('Should throws an IdNotFoundError when the given id is not registered', async () => {
    const promise = recommendationService.decreaseScore(1);
    await expect(promise).rejects.toThrowError(IdNotFoundError);
  });
  it('Should returns false when the requested id is valid and registered but the score will be minor then -5', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    const result = await recommendationRepository.create(validName, validLink);
    let score = 0;
    for (let i = 0; i < 5; i += 1) {
      score -= 1;
      await recommendationRepository.decreaseScore(result[0].id, score);
    }
    const promise = await recommendationService.decreaseScore(result[0].id);
    expect(promise).toEqual(false);
  });
  it('Should returns true when the requested id is valid and registered', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    const result = await recommendationRepository.create(validName, validLink);
    const promise = await recommendationService.decreaseScore(result[0].id);
    expect(promise).toEqual(-1);
  });

  // sortNumber
  it('Should returns with an random number given interval', async () => {
    const promise = await recommendationService.sortNumber(6, 0);
    expect(promise).toBeGreaterThanOrEqual(0);
  });

  // sortRandom
  it('Should throws a RecommendationEmptyError when there are no recommendations registered', async () => {
    const promise = recommendationService.sortRandom();
    await expect(promise).rejects.toThrowError(RecommendationEmptyError);
  });
  it('Should returns a random recommendation', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    const result = await recommendationRepository.create(validName, validLink);
    for (let i = 0; i < 12; i += 1) await recommendationRepository.increaseScore(result[0].id);
    const promise = await recommendationService.sortRandom();
    expect(promise).toBeTruthy();
  });
  it('Should returns a random recommendation', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    await recommendationRepository.create(validName, validLink);
    const promise = await recommendationService.sortRandom();
    expect(promise).toBeTruthy();
  });
  it('Should returns a random recommendation', async () => {
    const validLink1 = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    const validLink2 = 'https://www.youtube.com/watch?v=VUNA0xMGcqM&list=RDVUNA0xMGcqM&start_radio=1&ab_channel=Bia%26Nino';
    const result = await recommendationRepository.create(validName, validLink1);
    await recommendationRepository.create(validName, validLink2);
    for (let i = 0; i < 12; i += 1) await recommendationRepository.increaseScore(result[0].id);
    const promise = await recommendationService.sortRandom();
    expect(promise).toBeTruthy();
  });

  // verifyTopAmout
  it('Should returns the top amount given limit value', async () => {
    const validLink = 'https://www.youtube.com/watch?v=ffcitRgiNDs&list=RDffcitRgiNDs&start_radio=1&ab_channel=AdeleVEVO';
    const validName = 'valid name';
    await recommendationRepository.create(validName, validLink);
    const promise = await recommendationService.verifyTopAmount(2);
    expect(promise).toBeTruthy();
  });
  it('Should throws a RecommendationEmptyError when there are no recommendations registered', async () => {
    const promise = recommendationService.verifyTopAmount(2);
    await expect(promise).rejects.toThrowError(RecommendationEmptyError);
  });
});
