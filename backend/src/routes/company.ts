import express from 'express';
import { upload } from '../middleware/upload';
import { authenticate } from '../middleware/auth';
import * as companyController from '../controllers/companyController';

const router = express.Router();

// Company Profile routes
router.get('/', companyController.getCompanyProfile);
router.post('/', upload.single('logo'), companyController.createCompanyProfile);
router.put('/:id', upload.single('logo'), companyController.updateCompanyProfile);

// Admin Management routes (superadmin only)
router.get('/admins/list', authenticate, companyController.getAdmins);
router.put('/admins/:adminId/location', authenticate, companyController.assignLocationToAdmin);

export default router;
