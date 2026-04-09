const jwt = require('jsonwebtoken');
require('dotenv').config();

const generatePreToken = (user) => {
  return jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      token_type: "pre_context"
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const generateAccessToken = (context) => {
  return jwt.sign(
    {
      user_id: context.user_id,
      tenant_id: context.tenant_id,
      institute_id: context.institute_id,
      role_id: context.role_id,
      token_type: "access"
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generatePreToken,
  generateAccessToken,
  verifyToken
};
