import express from 'express';
import { authenticate } from '../middleware/auth';
import { checkLocationAccess } from '../middleware/locationAccess';
import { upload } from '../middleware/upload';
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/companyController';

const router = express.Router();

// Support both JSON and multipart/form-data (for optional image upload)
const conditionalImageUpload = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.includes('multipart/form-data')) {
    upload.single('image')(req, res, next);
  } else {
    next();
  }
};

// Public routes - no authentication required
router.get('/', getLocations); // Can be filtered by auth in controller

// Protected routes - require authentication
router.get('/:id', authenticate, checkLocationAccess, getLocationById);
router.post('/', authenticate, conditionalImageUpload, createLocation); // Superadmin only
router.put('/:id', authenticate, conditionalImageUpload, updateLocation); // Superadmin only
router.delete('/:id', authenticate, deleteLocation); // Superadmin only

export default router;
