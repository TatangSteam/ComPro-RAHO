import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id: req.params.id },
    });
    if (!location) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Create location
router.post('/', async (req, res) => {
  try {
    const { name, city, address, phone, mapUrl } = req.body;
    
    const location = await prisma.location.create({
      data: {
        name,
        city,
        address,
        phone: phone || null,
        mapUrl: mapUrl || null,
      },
    });
    
    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update location
router.put('/:id', async (req, res) => {
  try {
    const { name, city, address, phone, mapUrl } = req.body;
    
    const existingLocation = await prisma.location.findUnique({
      where: { id: req.params.id },
    });
    
    if (!existingLocation) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }
    
    const location = await prisma.location.update({
      where: { id: req.params.id },
      data: {
        name,
        city,
        address,
        phone: phone || null,
        mapUrl: mapUrl || null,
      },
    });
    
    res.json(location);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Delete location
router.delete('/:id', async (req, res) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id: req.params.id },
    });
    
    if (!location) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }
    
    await prisma.location.delete({
      where: { id: req.params.id },
    });
    
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
