const db = require("../config/db");

const createUser = async ({
  username,
  email,
  password_hash , 
  bio
}) => {
  console.log(username, email, password_hash , bio);
  const query = `
    INSERT INTO users
    (
      username,
      email,
      password_hash,
      bio
    )
    VALUES($1,$2,$3,$4)
    RETURNING *
  `;

  const result = await db.query(
    query,
    [ username, email, password_hash , bio]
  );

  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await db.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await db.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const storeRefreshToken = async (
  userId,
  token,
  expiresAt
) => {
  const result = await db.query(
    `
      INSERT INTO refresh_tokens
      (
      
        user_id,
        token,
        expires_at
      )
      VALUES($1,$2,$3)
      RETURNING *
    `,
    [ userId, token, expiresAt]
  );

  return result.rows[0];
};

const deleteRefreshToken = async (
  token
) => {
  await db.query(
    `
      DELETE FROM refresh_tokens
      WHERE token=$1
    `,
    [token]
  );
};

const findRefreshToken = async (
  token
) => {
  const result = await db.query(
    `
      SELECT *
      FROM refresh_tokens
      WHERE token=$1
    `,
    [token]
  );

  return result.rows[0];
};

const updatePassword = async (
  userId,
  passwordHash
) => {
  const result = await db.query(
    `
    UPDATE users
    SET password_hash = $1
    WHERE id = $2
    RETURNING *
    `,
    [passwordHash, userId]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  storeRefreshToken,
  deleteRefreshToken,
  findRefreshToken ,
  updatePassword
};