import express from 'express';
import { upload } from '../middleware/upload';
import * as companyController from '../controllers/companyController';

const router = express.Router();

router.get('/', companyController.getCompanyProfile);
router.post('/', upload.single('logo'), companyController.createCompanyProfile);
router.put('/:id', upload.single('logo'), companyController.updateCompanyProfile);

export default router;
