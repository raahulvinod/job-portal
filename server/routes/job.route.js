import express from 'express';
import {
  deleteJob,
  getAllJobs,
  getJob,
  getJobByEmail,
  postJob,
} from '../controllers/job.controller.js';

const router = express();

router.get('/all-jobs', getAllJobs);
router.post('/post-job', postJob);
router.get('/:id', getJob);
router.get('/by-email/:email', getJobByEmail);
router.delete('/:id', deleteJob);

export default router;
