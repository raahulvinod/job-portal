import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './config/dbConnect.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
