import express from 'express';
import { minioClient, bucketName } from '../config/minio';
import { optionalAuthenticate } from '../middleware/auth';

const router = express.Router();

router.get('/:fileName', optionalAuthenticate, async (req, res) => {
  const { fileName } = req.params;
  if (!fileName) return res.status(400).json({ error: 'Missing file name' });

  try {
    minioClient.getObject(bucketName, fileName, (err: Error | null, dataStream: any) => {
      if (err) {
        console.error('MinIO getObject error:', err);
        return res.status(404).end();
      }

      res.setHeader('Cache-Control', 'private');
      dataStream.pipe(res);
    });
  } catch (error) {
    console.error('Error streaming file from MinIO:', error);
    res.status(500).end();
  }
});

export default router;
