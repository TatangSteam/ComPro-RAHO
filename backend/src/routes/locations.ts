import express from 'express';
import { authenticate } from '../middleware/auth';
import { checkLocationAccess } from '../middleware/locationAccess';
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/companyController';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getLocations); // Can be filtered by auth in controller

// Protected routes - require authentication
router.get('/:id', authenticate, checkLocationAccess, getLocationById);
router.post('/', authenticate, createLocation); // Superadmin only
router.put('/:id', authenticate, updateLocation); // Superadmin only
router.delete('/:id', authenticate, deleteLocation); // Superadmin only

export default router;
