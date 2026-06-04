import { Request, Response } from 'express';
import pool from '../config/db';

export const getCertifications = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM certifications ORDER BY issue_date DESC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  const { name, issuer, issue_date, credential_id, credential_url } = req.body;

  if (!name || !issuer || !issue_date) {
    return res.status(400).json({ error: 'Name, issuer, and issue date are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO certifications (name, issuer, issue_date, credential_id, credential_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, issuer, issue_date, credential_id || null, credential_url || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating certification:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, issuer, issue_date, credential_id, credential_url } = req.body;

  try {
    const checkResult = await pool.query('SELECT * FROM certifications WHERE id = $1', [id]);
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Certification not found.' });
    }

    const current = checkResult.rows[0];

    const result = await pool.query(
      `UPDATE certifications
       SET name = $1, issuer = $2, issue_date = $3, credential_id = $4, credential_url = $5
       WHERE id = $6 RETURNING *`,
      [
        name !== undefined ? name : current.name,
        issuer !== undefined ? issuer : current.issuer,
        issue_date !== undefined ? issue_date : current.issue_date,
        credential_id !== undefined ? credential_id : current.credential_id,
        credential_url !== undefined ? credential_url : current.credential_url,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating certification:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM certifications WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certification not found.' });
    }
    res.json({ message: 'Certification deleted successfully.', certification: result.rows[0] });
  } catch (error) {
    console.error('Error deleting certification:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
