import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeMinio } from './config/minio';
import articlesRouter from './routes/articles';
import companyRouter from './routes/company';
import locationsRouter from './routes/locations';
import authRouter from './routes/auth';
import filesRouter from './routes/files';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/articles', articlesRouter);
app.use('/api/company', companyRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const startServer = async () => {
  await initializeMinio();
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
