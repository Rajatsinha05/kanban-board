const jwt =require("jsonwebtoken")
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  jwt.verify(token, "gurucool", (err, user) => {
    if (err) {
      
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    
    req.user = user;
    
    next();
  });
};
module.exports = verifyToken;
