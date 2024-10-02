import express from 'express';
import {
  signup,
  login,
  googleAuth,
  getUser,
} from '../controllers/user.controller.js';
import verifyToken from '../middlewares/varifyToken.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/user', verifyToken, getUser);

export default router;
