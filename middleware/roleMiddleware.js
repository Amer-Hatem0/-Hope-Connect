module.exports = {
  roleMiddleware: (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user?.role;
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  },

  multiRoleMiddleware: (roles) => {
    return (req, res, next) => {
      const userRole = req.user?.role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }
      next();
    };
  }
};
