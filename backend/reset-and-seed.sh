#!/bin/bash

echo "🔄 Resetting database and running migrations..."
npx prisma migrate reset --force

echo "🌱 Running seed script..."
npm run seed

echo "✅ Database reset and seeded successfully!"
echo ""
echo "📋 ADMIN CREDENTIALS:"
echo "Username: admin | Password: admin123"
echo "Username: superadmin | Password: super123"
echo ""
echo "🌐 ACCESS ADMIN PANEL:"
echo "URL: http://localhost:3000/admin/login"