// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Access denied: no token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: 'Authorization header is missing' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied: no token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // تأكد من وجود البيانات الأساسية في التوكن
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token structure' 
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      username: decoded.username || null
    };
    
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
};