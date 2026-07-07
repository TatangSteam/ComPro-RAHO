import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { uploadToMinio, deleteFromMinio } from '../utils/fileUpload';

const VALID_LOCATION_CATEGORIES = ['cabang', 'partnership'];

const prisma = new PrismaClient();

// ============================================================================
// Company Profile Endpoints
// ============================================================================

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

// ============================================================================
// Location Management Endpoints
// ============================================================================

/**
 * Get all locations
 * Superadmin: All locations
 * Other roles: Only their assigned location
 */
export const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    
    // Build where clause based on user role
    const where: any = {};
    
    // If not superadmin, filter by user's locationId
    if (user?.role !== 'superadmin' && user?.locationId) {
      where.id = user.locationId;
    }
    
    const locations = await prisma.location.findMany({
      where,
      include: {
        _count: {
          select: { admins: true }, // Count admins per location
        },
      },
      orderBy: [
        { category: 'asc' }, // "cabang" before "partnership" alphabetically
        { sortOrder: 'asc' },
        { city: 'asc' },
      ],
    });

    res.json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch locations' 
    });
  }
};

/**
 * Get single location by ID
 */
export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    // Check access permission
    if (user?.role !== 'superadmin' && user?.locationId !== id) {
      res.status(403).json({
        success: false,
        error: 'Access denied',
      });
      return;
    }

    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        admins: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
      },
    });

    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Location not found',
      });
      return;
    }

    res.json({
      success: true,
      location,
    });
  } catch (error) {
    console.error('Get location error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch location',
    });
  }
};

/**
 * Create new location (superadmin only)
 */
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    // Only superadmin can create locations
    if (user?.role !== 'superadmin') {
      res.status(403).json({
        success: false,
        error: 'Only superadmin can create locations',
      });
      return;
    }

    const { name, city, address, phone, mapUrl, category, sortOrder } = req.body;

    if (!name || !city || !address) {
      res.status(400).json({
        success: false,
        error: 'Name, city, and address are required',
      });
      return;
    }

    if (category && !VALID_LOCATION_CATEGORIES.includes(category)) {
      res.status(400).json({
        success: false,
        error: `Category must be one of: ${VALID_LOCATION_CATEGORIES.join(', ')}`,
      });
      return;
    }

    const parsedSortOrder = sortOrder !== undefined ? parseInt(sortOrder, 10) : 0;
    if (sortOrder !== undefined && Number.isNaN(parsedSortOrder)) {
      res.status(400).json({
        success: false,
        error: 'sortOrder must be a number',
      });
      return;
    }

    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadToMinio(req.file);
    }

    const location = await prisma.location.create({
      data: {
        name,
        city,
        address,
        phone,
        mapUrl,
        category: category || 'partnership',
        sortOrder: parsedSortOrder,
        imageUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Location created successfully',
      location,
    });
  } catch (error) {
    console.error('Create location error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create location',
    });
  }
};

/**
 * Update location
 * Superadmin: can update any location
 * Other roles: can only update their own assigned location
 */
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    // Superadmin can update any location; other roles only their own assigned location
    if (user?.role !== 'superadmin' && user?.locationId !== id) {
      res.status(403).json({
        success: false,
        error: 'You do not have permission to update this location',
      });
      return;
    }

    const { name, city, address, phone, mapUrl, category, sortOrder } = req.body;

    if (category && !VALID_LOCATION_CATEGORIES.includes(category)) {
      res.status(400).json({
        success: false,
        error: `Category must be one of: ${VALID_LOCATION_CATEGORIES.join(', ')}`,
      });
      return;
    }

    let parsedSortOrder: number | undefined;
    if (sortOrder !== undefined) {
      parsedSortOrder = parseInt(sortOrder, 10);
      if (Number.isNaN(parsedSortOrder)) {
        res.status(400).json({
          success: false,
          error: 'sortOrder must be a number',
        });
        return;
      }
    }

    let imageUrl: string | undefined;
    if (req.file) {
      const existingLocation = await prisma.location.findUnique({ where: { id } });
      if (existingLocation?.imageUrl) {
        await deleteFromMinio(existingLocation.imageUrl);
      }
      imageUrl = await uploadToMinio(req.file);
    }

    const location = await prisma.location.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(city && { city }),
        ...(address && { address }),
        ...(phone !== undefined && { phone }),
        ...(mapUrl !== undefined && { mapUrl }),
        ...(category && { category }),
        ...(parsedSortOrder !== undefined && { sortOrder: parsedSortOrder }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });

    res.json({
      success: true,
      message: 'Location updated successfully',
      location,
    });
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update location',
    });
  }
};

/**
 * Delete location (superadmin only)
 */
export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    // Only superadmin can delete locations
    if (user?.role !== 'superadmin') {
      res.status(403).json({
        success: false,
        error: 'Only superadmin can delete locations',
      });
      return;
    }

    // Check if location has admins
    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        _count: {
          select: { admins: true },
        },
      },
    });

    if (!location) {
      res.status(404).json({
        success: false,
        error: 'Location not found',
      });
      return;
    }

    if (location._count.admins > 0) {
      res.status(400).json({
        success: false,
        error: `Cannot delete location with ${location._count.admins} assigned admin(s)`,
        message: 'Please reassign or remove admins first',
      });
      return;
    }

    if (location.imageUrl) {
      await deleteFromMinio(location.imageUrl);
    }

    await prisma.location.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Location deleted successfully',
    });
  } catch (error) {
    console.error('Delete location error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete location',
    });
  }
};

// ============================================================================
// Admin Management with Location Assignment
// ============================================================================

/**
 * Get all admins (superadmin only)
 */
export const getAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    // Only superadmin can view all admins
    if (user?.role !== 'superadmin') {
      res.status(403).json({
        success: false,
        error: 'Only superadmin can view all admins',
      });
      return;
    }

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        locationId: true,
        location: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      admins,
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admins',
    });
  }
};

/**
 * Assign location to admin (superadmin only)
 */
export const assignLocationToAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.params;
    const { locationId } = req.body;
    const user = (req as any).user;

    // Only superadmin can assign locations
    if (user?.role !== 'superadmin') {
      res.status(403).json({
        success: false,
        error: 'Only superadmin can assign locations to admins',
      });
      return;
    }

    // Validate location exists if locationId provided
    if (locationId) {
      const location = await prisma.location.findUnique({
        where: { id: locationId },
      });

      if (!location) {
        res.status(404).json({
          success: false,
          error: 'Location not found',
        });
        return;
      }
    }

    // Update admin's location
    const admin = await prisma.admin.update({
      where: { id: adminId },
      data: {
        locationId: locationId || null, // null for no location (superadmin)
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        locationId: true,
        location: true,
      },
    });

    res.json({
      success: true,
      message: locationId 
        ? 'Location assigned successfully' 
        : 'Location unassigned successfully',
      admin,
    });
  } catch (error) {
    console.error('Assign location error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to assign location',
    });
  }
};
