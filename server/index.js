import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import connectDb from './config/dbConnect.js';

import userRoutes from './routes/user.route.js';
import jobRoutes from './routes/job.route.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
