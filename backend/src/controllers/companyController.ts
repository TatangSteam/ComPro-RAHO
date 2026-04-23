import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploadToMinio, deleteFromMinio } from '../utils/fileUpload';

const prisma = new PrismaClient();

export const getCompanyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await prisma.companyProfile.findFirst();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createCompanyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, email, phone, address } = req.body;
    let logoUrl: string | null = null;

    if (req.file) {
      logoUrl = await uploadToMinio(req.file);
    }

    const profile = await prisma.companyProfile.create({
      data: {
        name,
        description,
        email,
        phone,
        address,
        logoUrl,
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateCompanyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, email, phone, address } = req.body;
    const existingProfile = await prisma.companyProfile.findUnique({
      where: { id: req.params.id },
    });

    if (!existingProfile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    let logoUrl = existingProfile.logoUrl;

    if (req.file) {
      if (existingProfile.logoUrl) {
        await deleteFromMinio(existingProfile.logoUrl);
      }
      logoUrl = await uploadToMinio(req.file);
    }

    const profile = await prisma.companyProfile.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        email,
        phone,
        address,
        logoUrl,
      },
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
