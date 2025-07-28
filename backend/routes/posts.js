import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// POST a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, category, author } = req.body;
    const post = await Post.create({ title, content, category, author });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
