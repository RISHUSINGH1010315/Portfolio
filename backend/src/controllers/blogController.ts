import { Request, Response } from 'express';
import pool from '../config/db';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, content, summary, tags, image_url } = req.body;

  if (!title || !content || !summary || !tags) {
    return res.status(400).json({ error: 'Title, content, summary, and tags are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO blogs (title, content, summary, tags, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, content, summary, tags, image_url || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, summary, tags, image_url } = req.body;

  try {
    const checkResult = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    const current = checkResult.rows[0];

    const result = await pool.query(
      `UPDATE blogs
       SET title = $1, content = $2, summary = $3, tags = $4, image_url = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [
        title !== undefined ? title : current.title,
        content !== undefined ? content : current.content,
        summary !== undefined ? summary : current.summary,
        tags !== undefined ? tags : current.tags,
        image_url !== undefined ? image_url : current.image_url,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.json({ message: 'Blog post deleted successfully.', blog: result.rows[0] });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
