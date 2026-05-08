import express from 'express';
import { login, verifyToken, changePassword, getProfile, updateProfile } from '../controllers/authController';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/verify
router.get('/verify', verifyToken);

// GET /api/auth/profile
router.get('/profile', getProfile);

// PUT /api/auth/profile
router.put('/profile', updateProfile);

// POST /api/auth/change-password
router.post('/change-password', changePassword);

export default router;