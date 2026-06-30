const {
  generateAccessToken,
  generateRefreshToken,
} = require("../config/jwt");

const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken({
      id: user.id,
    }),
  };
};

module.exports = generateTokens;