import jwt from 'jsonwebtoken';

const ADMIN = {
  username: 'admin',
  password: 'admin123', // plain text password
};

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN.username || password !== ADMIN.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username: ADMIN.username, isAdmin: true }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
  res.json({ token });
}; 