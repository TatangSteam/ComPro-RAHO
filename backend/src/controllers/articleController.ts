import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploadToMinio, deleteFromMinio } from '../utils/fileUpload';

const prisma = new PrismaClient();

export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: req.params.id },
    });
    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getArticleBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: req.params.slug },
    });
    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, content, excerpt, author, category, published } = req.body;
    let imageUrl: string | null = null;

    if (req.file) {
      imageUrl = await uploadToMinio(req.file);
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || '',
        author: author || 'Admin',
        category: category || 'umum',
        imageUrl,
        published: typeof published === 'boolean' ? published : published === 'true',
      },
    });

    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, content, excerpt, author, category, published } = req.body;
    const existingArticle = await prisma.article.findUnique({
      where: { id: req.params.id },
    });

    if (!existingArticle) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    let imageUrl = existingArticle.imageUrl;

    if (req.file) {
      if (existingArticle.imageUrl) {
        await deleteFromMinio(existingArticle.imageUrl);
      }
      imageUrl = await uploadToMinio(req.file);
    }

    const article = await prisma.article.update({
      where: { id: req.params.id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || '',
        author: author || existingArticle.author,
        category: category || existingArticle.category,
        imageUrl,
        published: typeof published === 'boolean' ? published : published === 'true',
      },
    });

    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: req.params.id },
    });

    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    if (article.imageUrl) {
      await deleteFromMinio(article.imageUrl);
    }

    await prisma.article.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
