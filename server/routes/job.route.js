import express from 'express';
import { getAllJobs, postJob } from '../controllers/job.controller.js';

const router = express();

router.get('/all-jobs', getAllJobs);
router.post('/post-job', postJob);

export default router;
