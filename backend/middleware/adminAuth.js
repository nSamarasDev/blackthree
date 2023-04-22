const adminAuth = (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ msg: "You are not authorized" });
    }
  
    // Check if user is an admin
    if (req.user.isAdmin !== true) {
      return res.status(401).json({ msg: "You are not authorized" });
    }
  
    // User is authenticated and an admin
    next();
  };
  
  module.exports = adminAuth;
  