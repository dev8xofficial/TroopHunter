import bcrypt from 'bcrypt';
import User from '../models/User/User';

export const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    id: 1,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: 'admin',
  });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

// Add more service functions as needed
