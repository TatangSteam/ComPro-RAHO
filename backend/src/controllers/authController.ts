import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email and password are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email format' 
      });
    }

    // Find admin by email (case insensitive) and include location
    const admin = await prisma.admin.findFirst({
      where: { 
        email: {
          equals: email,
          mode: 'insensitive'
        }
      },
      include: {
        location: true, // Include location data
      },
    });

    if (!admin || !admin.isActive) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { 
        updatedAt: new Date() // Track last login
      }
    });

    // Generate JWT token with location info
    const token = jwt.sign(
      { 
        adminId: admin.id, 
        email: admin.email,
        username: admin.username, 
        role: admin.role,
        name: admin.name,
        locationId: admin.locationId, // Include locationId in token
        iat: Math.floor(Date.now() / 1000)
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return success response (don't send password)
    const { password: _, ...adminData } = admin;
    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: adminData,
      expiresIn: '24h'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Get fresh admin data with location
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        locationId: true, // Include locationId
        location: true,   // Include location data
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin || !admin.isActive) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid or expired token' 
      });
    }

    res.json({
      success: true,
      admin,
      tokenInfo: {
        issuedAt: new Date(decoded.iat * 1000),
        expiresAt: new Date(decoded.exp * 1000),
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid token' 
      });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        success: false,
        error: 'Token expired' 
      });
    }
    res.status(500).json({ 
      success: false,
      error: 'Token verification failed' 
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Current password and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'New password must be at least 6 characters long' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
    });

    if (!admin) {
      return res.status(404).json({ 
        success: false,
        error: 'Admin not found' 
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Current password is incorrect' 
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.admin.update({
      where: { id: admin.id },
      data: { 
        password: hashedNewPassword,
        updatedAt: new Date()
      },
    });

    res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        locationId: true, // Include locationId
        location: true,   // Include location data
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return res.status(404).json({ 
        success: false,
        error: 'Admin not found' 
      });
    }

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid email format' 
        });
      }

      // Check if email is already taken by another admin
      const existingAdmin = await prisma.admin.findFirst({
        where: { 
          email: {
            equals: email,
            mode: 'insensitive'
          },
          NOT: {
            id: decoded.adminId
          }
        },
      });

      if (existingAdmin) {
        return res.status(400).json({ 
          success: false,
          error: 'Email is already taken' 
        });
      }
    }

    // Update profile
    const updatedAdmin = await prisma.admin.update({
      where: { id: decoded.adminId },
      data: { 
        ...(name && { name }),
        ...(email && { email }),
        updatedAt: new Date()
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      admin: updatedAdmin
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};