const db = require("../config/db");

/**
 * Create Tag
 */
const createTag = async (
  name
) => {
  const { rows } = await db.query(
    `
    INSERT INTO tags
    (
      name
    )
    VALUES ($1)
    RETURNING *
    `,
    [ name]
  );

  return rows[0];
};


const findTagByName = async (name) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM tags
    WHERE name = $1
    `,
    [name]
  );

  return rows[0];
};

/**
 * Update Tag
 */
const updateTag = async (
  tagId,
  name
) => {
  const { rows } = await db.query(
    `
    UPDATE tags
    SET name = $2
    WHERE id = $1
    RETURNING *
    `,
    [tagId, name]
  );

  return rows[0];
};

/**
 * Delete Tag
 */
const deleteTag = async (tagId) => {
  const { rows } = await db.query(
    `
    DELETE FROM tags
    WHERE id = $1
    RETURNING *
    `,
    [tagId]
  );

  return rows[0];
};

/**
 * Get All Tags
 */
const getAllTags = async () => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM tags
    ORDER BY name ASC
    `
  );

  return rows;
};

const attachTagToPrompt = async (
  promptId,
  tagId
) => {
  const { rows } = await db.query(
    `
    INSERT INTO prompt_tags
    (
      prompt_id,
      tag_id
    )
    VALUES ($1, $2)
    RETURNING *
    `,
    [promptId, tagId]
  );

  return rows[0];
};


/**
 * Get Prompts By Tag
 */
const getPromptsByTag = async (
  tagId,
  limit = 20,
  offset = 0
) => {
  const { rows } = await db.query(
    `
    SELECT
      p.*
    FROM prompts p
    INNER JOIN prompt_tags pt
      ON p.id = pt.prompt_id
    WHERE pt.tag_id = $1
    ORDER BY p.created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [tagId, limit, offset]
  );

  return rows;
};

const countTags = async () => {
  const { count, error } = await supabase
    .from("tags")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count;
};

const findTagById = async (tagId) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM tags
    WHERE id = $1
    `,
    [tagId]
  );

  return rows[0];
};
module.exports = {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
  getPromptsByTag,
  countTags,
  findTagByName ,
  attachTagToPrompt,
  findTagById,
};