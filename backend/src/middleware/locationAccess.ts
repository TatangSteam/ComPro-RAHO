import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        role: string;
        locationId?: string;
      };
    }
  }
}

/**
 * Middleware to check if user has access to requested location
 * Superadmin can access all locations
 * Other roles can only access their assigned location
 */
export const checkLocationAccess = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: 'Authentication required',
      });
    }

    // Superadmin has access to all locations
    if (user.role === 'superadmin') {
      return next();
    }

    // Get requested locationId from params, query, or body
    const requestedLocationId = 
      req.params.locationId || 
      req.query.locationId || 
      req.body.locationId;

    // If no specific location is requested, allow (will be filtered in controller)
    if (!requestedLocationId) {
      return next();
    }

    // Check if user's location matches requested location
    if (user.locationId && user.locationId !== requestedLocationId) {
      return res.status(403).json({
        error: 'Access denied. You can only access your assigned location.',
        message: 'You do not have permission to access this location.',
      });
    }

    next();
  } catch (error) {
    console.error('Location access check error:', error);
    res.status(500).json({
      error: 'Internal server error during access check',
    });
  }
};

/**
 * Middleware to filter queries by user's location
 * Adds locationId filter for non-superadmin users
 */
export const filterByUserLocation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: 'Authentication required',
      });
    }

    // Superadmin can see all
    if (user.role === 'superadmin') {
      return next();
    }

    // Add location filter to request for other roles
    if (user.locationId) {
      req.query.locationId = user.locationId;
    }

    next();
  } catch (error) {
    console.error('Location filter error:', error);
    res.status(500).json({
      error: 'Internal server error during location filter',
    });
  }
};

/**
 * Helper function to check if user can manage a specific admin
 */
export const canManageAdmin = (managerRole: string, managerLocationId: string | null, targetLocationId: string | null): boolean => {
  // Superadmin can manage all admins
  if (managerRole === 'superadmin') {
    return true;
  }

  // Other roles cannot manage admins
  if (managerRole !== 'superadmin') {
    return false;
  }

  return false;
};
