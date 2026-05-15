import { minioClient, bucketName, extractKeyFromUrl } from '../config/minio';
import { v4 as uuidv4 } from 'uuid';

export const uploadToMinio = async (file: Express.Multer.File): Promise<string> => {
  const fileName = `${uuidv4()}-${file.originalname}`;
  
  await minioClient.putObject(
    bucketName,
    fileName,
    file.buffer,
    file.size,
    {
      'Content-Type': file.mimetype,
    }
  );

  const apiPrefix = process.env.API_PREFIX || '/api';
  const filePath = `${apiPrefix}/files/${fileName}`;
  return filePath;
};

export const deleteFromMinio = async (fileUrl: string): Promise<void> => {
  try {
    const fileName = extractKeyFromUrl(fileUrl);
    if (fileName) {
      await minioClient.removeObject(bucketName, fileName);
    }
  } catch (error) {
    console.error('Error deleting file from MinIO:', error);
  }
};
