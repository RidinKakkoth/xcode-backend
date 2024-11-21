import jwt from 'jsonwebtoken';

const authenticate =async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Decode the token and attach the user to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.userId = await decoded.id; // `user` is part of the payload in the JWT
  
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticate;
