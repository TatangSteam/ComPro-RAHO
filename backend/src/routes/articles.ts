import express from 'express';
import { upload } from '../middleware/upload';
import * as articleController from '../controllers/articleController';

const router = express.Router();

router.get('/', articleController.getAllArticles);
router.get('/by-id/:id', articleController.getArticleById);
router.get('/:slug', articleController.getArticleBySlug);

// Create article - support both JSON and multipart
router.post('/', (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.includes('multipart/form-data')) {
    upload.single('image')(req, res, next);
  } else {
    next();
  }
}, articleController.createArticle);

// Update article - support both JSON and multipart
router.put('/:id', (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.includes('multipart/form-data')) {
    upload.single('image')(req, res, next);
  } else {
    next();
  }
}, articleController.updateArticle);

router.delete('/:id', articleController.deleteArticle);

export default router;
