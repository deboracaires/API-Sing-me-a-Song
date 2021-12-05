import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/recommendations', recommendationController.newRecommendation);
router.post('/recommendations/:id/upvote', recommendationController.upVote);
router.post('/recommendations/:id/downvote', recommendationController.downVote);

router.get('/recommendations/random', recommendationController.getRandom);
router.get('/recommendations/top/:amount', recommendationController.getTopAmout);

export default router;
