import { Request, Response } from 'express';
import pool from '../config/db';

export const handleChatMessage = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  const queryText = message.toLowerCase();

  try {
    let reply = '';

    if (queryText.includes('project') || queryText.includes('work')) {
      const projectCountResult = await pool.query('SELECT COUNT(*) FROM projects');
      const count = projectCountResult.rows[0].count;
      const latestProjectResult = await pool.query('SELECT title FROM projects ORDER BY created_at DESC LIMIT 1');
      const latest = latestProjectResult.rows[0]?.title || 'None yet';
      
      reply = `I have verified our neural database. We have deployed ${count} projects. Our latest operational deployment is "${latest}". You can explore them in the Projects section!`;
    } else if (queryText.includes('skill') || queryText.includes('stack') || queryText.includes('technology')) {
      reply = `Systems check: Core tech stack focuses on Artificial Intelligence, Machine Learning, Python Development, Full-Stack Node/React applications, and Cyber Security. Specifically, we utilize PyTorch, TensorFlow, PostgreSQL, React, Framer Motion, and Tailwind CSS.`;
    } else if (queryText.includes('certif') || queryText.includes('credentials')) {
      const certCountResult = await pool.query('SELECT COUNT(*) FROM certifications');
      const count = certCountResult.rows[0].count;
      reply = `Authentication checks show ${count} validated certifications in our ledger. These span AI research, machine learning expertise, and software security.`;
    } else if (queryText.includes('about') || queryText.includes('who is') || queryText.includes('rishu')) {
      reply = `Subject: Rishu Singh. Profile: Lead Architect and AI Engineer specializing in neural architectures, defensive cyber frameworks, and full-stack software development. Currently pursuing B.Tech CSE at Galgotias University.`;
    } else if (queryText.includes('hello') || queryText.includes('hi') || queryText.includes('hey')) {
      reply = `Greetings operator. RISHU.AI chatbot interface online. Awaiting system command...`;
    } else if (queryText.includes('contact') || queryText.includes('hire') || queryText.includes('email')) {
      reply = `To initiate contact, you can use the CONTACT_ME console button on the main layout or send a message directly via the contact form. Secure transmission protocols are active.`;
    } else {
      reply = `Command "${message}" processed. My neural subroutines recommend asking about "projects", "tech skills", "about Rishu", or "contact info". How shall we proceed?`;
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat processing error:', error);
    res.status(500).json({ error: 'Failed to process message with AI module.' });
  }
};
