const db = require("../config/db");

/**
 * Create Prompt
 */
const createPrompt = async (
 
  userId,
  title,
  promptText,
  imageUrl
) => {
  console.log('userId',userId)
  const { rows } = await db.query(
    `
    INSERT INTO prompts
    (
      
      user_id,
      title,
      prompt_text,
      image_url
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [ userId, title, promptText, imageUrl]
  );

  return rows[0];
};

/**
 * Find Prompt By Id
 */
const findPromptById = async (promptId) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM prompts
    WHERE id = $1
    `,
    [promptId]
  );

  return rows[0];
};

/**
 * Update Prompt
 */
const updatePrompt = async (
  promptId,
  title,
  promptText,
  imageUrl
) => {
  const { rows } = await db.query(
    `
    UPDATE prompts
    SET
      title = $2,
      prompt_text = $3,
      image_url = $4,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
    `,
    [promptId, title, promptText, imageUrl]
  );

  return rows[0];
};

/**
 * Delete Prompt
 */
const deletePrompt = async (promptId) => {
  const { rows } = await db.query(
    `
    DELETE FROM prompts
    WHERE id = $1
    RETURNING *
    `,
    [promptId]
  );

  return rows[0];
};

/**
 * Get All Prompts
 */
const getAllPrompts = async (limit = 20, offset = 0) => {
  const promptsQuery = db.query(
    `
    SELECT *
    FROM prompts
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const countQuery = db.query(
    `
    SELECT COUNT(*) AS total
    FROM prompts
    `
  );

  const [{ rows }, { rows: countRows }] =
    await Promise.all([promptsQuery, countQuery]);

  return {
    prompts: rows,
    total: Number(countRows[0].total),
  };
};

/**
 * Search Prompts
 */
const searchPrompts = async (searchTerm) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM prompts
    WHERE
      title ILIKE $1
      OR prompt_text ILIKE $1
    ORDER BY created_at DESC
    `,
    [`%${searchTerm}%`]
  );

  return rows;
};

/**
 * Get Trending Prompts
 */
const getTrendingPrompts = async (limit = 10) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM prompts
    ORDER BY likes_count DESC, saves_count DESC
    LIMIT $1
    `,
    [limit]
  );

  return rows;
};

/**
 * Get Latest Prompts
 */
const getLatestPrompts = async (limit = 10) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM prompts
    ORDER BY created_at DESC
    LIMIT $1
    `,
    [limit]
  );

  return rows;
};

const countPrompts = async () => {
  const { count, error } = await supabase
    .from("prompts")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count;
};

module.exports = {
  createPrompt,
  findPromptById,
  updatePrompt,
  deletePrompt,
  getAllPrompts,
  searchPrompts,
  getTrendingPrompts,
  getLatestPrompts,
  countPrompts,
};