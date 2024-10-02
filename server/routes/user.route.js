import express from 'express';
import {
  signup,
  login,
  googleAuth,
  getUser,
  fetchAppliedJobByUser,
} from '../controllers/user.controller.js';
import verifyToken from '../middlewares/varifyToken.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/user', verifyToken, getUser);
router.post('/applied-jobs', verifyToken, fetchAppliedJobByUser);

export default router;
