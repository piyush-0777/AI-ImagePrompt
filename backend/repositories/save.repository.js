const db = require("../config/db");

/**
 * Save Prompt
 */
const savePrompt = async (

  userId,
  promptId
) => {
  const { rows } = await db.query(
    `
    INSERT INTO saved_prompts
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
    SET saves_count = saves_count + 1
    WHERE id = $1
    `,
    [promptId]
  );

  return rows[0];
};

/**
 * Remove Saved Prompt
 */
const removeSavedPrompt = async (
  userId,
  promptId
) => {
  const { rows } = await db.query(
    `
    DELETE FROM saved_prompts
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
      SET saves_count = GREATEST(saves_count - 1, 0)
      WHERE id = $1
      `,
      [promptId]
    );
  }

  return rows[0];
};

/**
 * Count Saves For Prompt
 */
const countSaves = async (promptId) => {
  const { rows } = await db.query(
    `
    SELECT COUNT(*) AS total_saves
    FROM saved_prompts
    WHERE prompt_id = $1
    `,
    [promptId]
  );

  return Number(rows[0].total_saves);
};

/**
 * Get My Saved Prompts
 */
const getMySavedPrompts = async (
  userId,
  limit = 20,
  offset = 0
) => {
  const { rows } = await db.query(
    `
    SELECT
      p.*
    FROM saved_prompts sp
    INNER JOIN prompts p
      ON p.id = sp.prompt_id
    WHERE sp.user_id = $1
    ORDER BY sp.created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [userId, limit, offset]
  );

  return rows;
};
const isSave  = async (
  userId,
  promptId
) => {

  const { rows } = await db.query(
    `
    SELECT EXISTS (
      SELECT 1
      FROM saved_prompts
      WHERE user_id = $1
        AND prompt_id = $2
    ) AS saved
    `,
    [userId, promptId]
  );
  return rows[0].saved;
}

module.exports = {
  savePrompt,
  removeSavedPrompt,
  countSaves,
  getMySavedPrompts,
  isSave ,
};