import { Request, Response } from 'express';
import pool from '../config/db';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY order_index ASC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { title, description, category, tech_stack, github_url, live_url, image_url, order_index } = req.body;

  if (!title || !description || !category || !tech_stack) {
    return res.status(400).json({ error: 'Title, description, category, and tech stack are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO projects (title, description, category, tech_stack, github_url, live_url, image_url, order_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, category, tech_stack, github_url || null, live_url || null, image_url || null, order_index || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, category, tech_stack, github_url, live_url, image_url, order_index } = req.body;

  try {
    const checkResult = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const current = checkResult.rows[0];

    const result = await pool.query(
      `UPDATE projects 
       SET title = $1, description = $2, category = $3, tech_stack = $4, github_url = $5, live_url = $6, image_url = $7, order_index = $8
       WHERE id = $9 RETURNING *`,
      [
        title !== undefined ? title : current.title,
        description !== undefined ? description : current.description,
        category !== undefined ? category : current.category,
        tech_stack !== undefined ? tech_stack : current.tech_stack,
        github_url !== undefined ? github_url : current.github_url,
        live_url !== undefined ? live_url : current.live_url,
        image_url !== undefined ? image_url : current.image_url,
        order_index !== undefined ? order_index : current.order_index,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json({ message: 'Project deleted successfully.', project: result.rows[0] });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
