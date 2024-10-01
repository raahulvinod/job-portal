import express from 'express';
import {
  deleteJob,
  getAllJobs,
  getJob,
  getJobByEmail,
  postJob,
  updateJob,
  getJobByUser,
} from '../controllers/job.controller.js';
import verifyToken from '../middlewares/varifyToken.js';

const router = express();

router.get('/all-jobs', getAllJobs);
router.get('/:id', getJob);
router.get('/by-email/:email', getJobByEmail);
router.patch('/:id', verifyToken, updateJob);
router.post('/post-job', verifyToken, postJob);
router.post('/my-jobs', verifyToken, getJobByUser);
router.delete('/:id', verifyToken, deleteJob);

export default router;
