const db = require("../config/db");

/**
 * Like Prompt
 */
const likePrompt = async (
 
  userId,
  promptId
) => {
  const { rows } = await db.query(
    `
    INSERT INTO likes
    (
    
      user_id,
      prompt_id
    )
    VALUES ($1, $2)
    RETURNING *
    `,
    [ userId, promptId]
  );

  await db.query(
    `
    UPDATE prompts
    SET likes_count = likes_count + 1
    WHERE id = $1
    `,
    [promptId]
  );

  return rows[0];
};

/**
 * Unlike Prompt
 */
const unlikePrompt = async (
  userId,
  promptId
) => {
  const { rows } = await db.query(
    `
    DELETE FROM likes
    WHERE user_id = $1
      AND prompt_id = $2
    RETURNING *
    `,
    [userId, promptId]
  );

  if (rows.length > 0) {
    await db.query(
      `
      UPDATE prompts
      SET likes_count = GREATEST(likes_count - 1, 0)
      WHERE id = $1
      `,
      [promptId]
    );
  }

  return rows[0];
};

/**
 * Count Likes
 */
const countLikes = async (promptId) => {
  const { rows } = await db.query(
    `
    SELECT COUNT(*) AS total_likes
    FROM likes
    WHERE prompt_id = $1
    `,
    [promptId]
  );

  return Number(rows[0].total_likes);
};

/**
 * Check User Liked Prompt
 */
const isLiked = async (
  userId,
  promptId
) => {
  const { rows } = await db.query(
    `
    SELECT EXISTS (
      SELECT 1
      FROM likes
      WHERE user_id = $1
        AND prompt_id = $2
    ) AS liked
    `,
    [userId, promptId]
  );

  return rows[0].liked;
};

module.exports = {
  likePrompt,
  unlikePrompt,
  countLikes,
  isLiked,
};