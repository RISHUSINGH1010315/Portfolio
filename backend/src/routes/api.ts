import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as projectController from '../controllers/projectController';
import * as certController from '../controllers/certificationController';
import * as blogController from '../controllers/blogController';
import * as contactController from '../controllers/contactController';
import * as aiChatController from '../controllers/aiChatController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Public/Private Project routes
router.get('/projects', projectController.getProjects);
router.post('/projects', authenticateToken, projectController.createProject);
router.put('/projects/:id', authenticateToken, projectController.updateProject);
router.delete('/projects/:id', authenticateToken, projectController.deleteProject);

// Public/Private Certification routes
router.get('/certifications', certController.getCertifications);
router.post('/certifications', authenticateToken, certController.createCertification);
router.put('/certifications/:id', authenticateToken, certController.updateCertification);
router.delete('/certifications/:id', authenticateToken, certController.deleteCertification);

// Public/Private Blog routes
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', authenticateToken, blogController.createBlog);
router.put('/blogs/:id', authenticateToken, blogController.updateBlog);
router.delete('/blogs/:id', authenticateToken, blogController.deleteBlog);

// Contact routes
router.post('/contacts', contactController.submitContact);
router.get('/contacts', authenticateToken, contactController.getContacts);
router.patch('/contacts/:id/read', authenticateToken, contactController.markAsRead);
router.delete('/contacts/:id', authenticateToken, contactController.deleteContact);

// AI Assistant route
router.post('/chat', aiChatController.handleChatMessage);

export default router;
