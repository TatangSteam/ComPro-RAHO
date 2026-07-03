# Locations Integration Documentation

## Overview
The LocationsSection component has been successfully integrated into the home page. It fetches location data from the backend API (`/api/locations`) and displays them in an interactive carousel.

## What Was Done

### 1. Created LocationsSection Component
- **Path**: `frontend/src/components/home/LocationsSection.tsx`
- **Features**:
  - Fetches locations from `/api/locations` endpoint
  - Interactive carousel with navigation buttons
  - Displays location details (name, city, address, phone)
  - Responsive design with smooth transitions
  - Loading states and error handling
  - Links to Google Maps (if mapUrl is provided)

### 2. Integrated with Home Page
- Added LocationsSection as Section 4 (before Footer)
- Installed required dependency: `lucide-react` for icons

### 3. Database Schema (No Changes Required)
The current Location model in Prisma schema:
```prisma
model Location {
  id          String   @id @default(uuid())
  name        String
  city        String
  address     String
  phone       String?
  mapUrl      String?
  admins      Admin[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## IMPORTANT: Location Images

### Current Implementation
The Location model **does not have an image field**. The component uses placeholder images based on city names.

### Image Mapping
Location images are currently mapped in `LocationsSection.tsx`:
```typescript
const cityImages: Record<string, string> = {
  jakarta: '/assets/locations/jakarta.jpg',
  surabaya: '/assets/locations/surabaya.jpg',
  bandung: '/assets/locations/bandung.jpg',
  medan: '/assets/locations/medan.jpg',
  semarang: '/assets/locations/semarang.jpg',
  default: '/assets/locations/default.jpg',
};
```

### Next Steps for Images

**Option 1: Add Images to Public Folder (Quick Solution)**
1. Create folder: `frontend/public/assets/locations/`
2. Add images for each city:
   - `jakarta.jpg`
   - `surabaya.jpg`
   - `bandung.jpg`
   - `medan.jpg`
   - `semarang.jpg`
   - `default.jpg` (fallback for cities not listed)

**Option 2: Add imageUrl Field to Schema (Recommended)**
1. Update Prisma schema:
```prisma
model Location {
  id          String   @id @default(uuid())
  name        String
  city        String
  address     String
  phone       String?
  mapUrl      String?
  imageUrl    String?  // Add this field
  admins      Admin[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

2. Run migration:
```bash
cd backend
npx prisma migrate dev --name add_location_image
```

3. Update LocationsSection.tsx to use `location.imageUrl` instead of city-based mapping

## API Endpoint Used
- **Endpoint**: `GET /api/locations`
- **Response Format**:
```json
{
  "success": true,
  "locations": [
    {
      "id": "uuid",
      "name": "Jakarta Office",
      "city": "Jakarta",
      "address": "Jl. Example No. 123",
      "phone": "+62 21 1234567",
      "mapUrl": "https://maps.google.com/..."
    }
  ]
}
```

## Component Props
The LocationsSection component doesn't accept any props - it fetches data automatically on mount.

## Styling
- Uses Tailwind CSS
- Responsive design (mobile-first)
- Consistent with existing design system colors:
  - Primary: `#B69133`
  - Secondary: `#D6B85A`
- Smooth animations and transitions

## Performance Considerations
- Images use Next.js Image component for optimization
- Loading states prevent layout shift
- Error handling ensures graceful degradation
- Component only renders if locations exist

## Testing
To test the integration:
1. Ensure backend is running with location data
2. Start frontend: `cd frontend && npm run dev`
3. Visit homepage
4. Scroll to Section 4 to see locations carousel

## Future Enhancements
1. Add image upload feature in admin panel
2. Implement image optimization/CDN
3. Add more location details (operating hours, services)
4. Add location search/filter functionality
5. Integrate real-time availability status
