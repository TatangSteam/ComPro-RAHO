import bcrypt from 'bcrypt';

export const admins = [
  {
    username: 'admin',
    password: 'admin123', // Will be hashed
    email: 'admin@raho.com',
    name: 'Administrator RAHO',
    role: 'admin',
    isActive: true,
  },
  {
    username: 'superadmin',
    password: 'super123', // Will be hashed
    email: 'superadmin@raho.com',
    name: 'Super Administrator',
    role: 'superadmin',
    isActive: true,
  },
  {
    username: 'editor',
    password: 'editor123', // Will be hashed
    email: 'editor@raho.com',
    name: 'Content Editor',
    role: 'editor',
    isActive: true,
  },
];

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};