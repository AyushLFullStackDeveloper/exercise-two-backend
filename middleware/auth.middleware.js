const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    req.user = decoded; // 🔥 VERY IMPORTANT
    next();
  } catch (err) {
    console.error('MIDDLEWARE ERROR:', err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
};

module.exports = authMiddleware;
