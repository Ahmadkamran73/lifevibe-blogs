import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', verifyAdmin, createPost);
router.put('/:id', verifyAdmin, updatePost);
router.delete('/:id', verifyAdmin, deletePost);

export default router;
