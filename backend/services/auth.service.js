const authRepository = require("../repositories/auth.repository");
const userRepository = require("../repositories/user.repository");

const generateTokens = require("../utils/generateToken");

const {
  hashPassword,
  comparePassword,
} = require("../utils/hashPassword");

const {
  verifyRefreshToken,
} = require("../config/jwt");

class AuthService {
  async registerUser(userData) {
    console.log(userData , 'userData' );
    const {
      username,
      email,
      password,
      bio,
    } = userData;

    const existingUser =
      await authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const passwordHash = await hashPassword(password);
    console.log(passwordHash);
    const user =
      await authRepository.createUser({
        username,
        email,
        password_hash: passwordHash,
        bio: bio || "",
      });

    const {
      accessToken,
      refreshToken,
    } = generateTokens(user);
    console.log("user.id =", user.id);
  console.log("refreshToken =", refreshToken);
    await authRepository.storeRefreshToken(
      user.id,
      refreshToken,
       new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async loginUser(email, password) {
    const user =
      await authRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid =
      await comparePassword(
        password,
        user.password_hash
      );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const {
      accessToken,
      refreshToken,
    } = generateTokens(user);

    await authRepository.storeRefreshToken(
      user.id,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async logoutUser(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token required");
    }

    await authRepository.deleteRefreshToken(
      refreshToken
    );

    return {
      message: "Logged out successfully",
    };
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token required");
    }

    const storedToken =
      await authRepository.findRefreshToken(
        refreshToken
      );

    if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

    const decoded =
      verifyRefreshToken(refreshToken);

    const user =
      await userRepository.getProfileById(
        decoded.id
      );

    if (!user) {
      throw new Error("User not found");
    }

    const tokens =
      generateTokens(user);

    await authRepository.deleteRefreshToken(
      refreshToken
    );

    await authRepository.storeRefreshToken(
      user.id,
      tokens.refreshToken ,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async resetPassword({email, oldPassword, newPassword}) {
  const user =
    await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid =
    await comparePassword(
      oldPassword,
      user.password_hash
    );

  if (!isPasswordValid) {
    throw new Error("Old password is incorrect");
  }

  const newPasswordHash =
    await hashPassword(newPassword);

  await authRepository.updatePassword(
    user.id,
    newPasswordHash
  );

  return {
    message: "Password reset successfully",
  };
}
}

module.exports = new AuthService();