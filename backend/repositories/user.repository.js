const db = require("../config/db");

const getProfileById = async (userId) => {
  const result = await db.query(
    `
    SELECT
      id,
      username,
      email,
      profile_image,
      bio,
      created_at
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
};

const updateProfile = async (
  userId,
  username,
  bio
) => {
  const result = await db.query(
    `
    UPDATE users
    SET
      username = $1,
      bio = $2,
      updated_at = NOW()
    WHERE id = $3
    RETURNING *
    `,
    [username, bio, userId]
  );

  return result.rows[0];
};

const updateProfileImage = async (
  userId,
  image
) => {
  const result = await db.query(
    `
    UPDATE users
    SET profile_image = $1
    WHERE id = $2
    RETURNING *
    `,
    [image, userId]
  );

  return result.rows[0];
};

const getUserPrompts = async (
  userId,
  limit=20,
  offset=0
) => {
  const result = await db.query(
    `
    SELECT *
    FROM prompts
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [userId, limit, offset]
  );

  return result.rows;
};

const getSavedPrompts = async (
  userId,
  limit = 20,
  offset = 0
) => {

  const result = await db.query(
    `
    SELECT
      p.id,
      p.title,
      p.prompt_text,
      p.image_url,
      p.likes_count,
      p.saves_count,
      sp.created_at AS saved_at
    FROM saved_prompts sp
    INNER JOIN prompts p
      ON p.id = sp.prompt_id
    WHERE sp.user_id = $1
    ORDER BY sp.created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [userId, limit, offset]
  );

  return result.rows;
};

const getLikedPrompts = async (
  userId,
  limit = 20,
  offset = 0
) => {

  const result = await db.query(
    `
    SELECT
      p.id,
      p.title,
      p.prompt_text,
      p.image_url,
      p.likes_count,
      p.saves_count,
      l.created_at AS liked_at
    FROM likes l
    INNER JOIN prompts p
      ON p.id = l.prompt_id
    WHERE l.user_id = $1
    ORDER BY l.created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [userId, limit, offset]
  );

  return result.rows;
};

const countUsers = async () => {
  const { count, error } = await supabase
    .from("users")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count;
};

module.exports = {
  getProfileById,
  updateProfile,
  updateProfileImage,
  getUserPrompts,
  getSavedPrompts,
  getLikedPrompts,
  countUsers
};