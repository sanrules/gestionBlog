const router = require('express').Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.log("Error obtaining all the posts. ", error);
        res.status(500).json({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.json({ success: "Post created", post: post });
    } catch (error) {
        console.log("Error creating the posts. ", error);
        res.status(422).json({ error: error.message })
    }
});

router.put('/', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: "Post updated", post: post });
    } catch (error) {
        console.log("Error updating the post. ", error);
        res.status(422).json({ error: error.message })
    }
});

router.delete('/:id', (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.json({ success: "Post deleted", post: post });
    } catch (error) {
        console.log("Error deleting the post. ", error);
        res.status(422).json({ error: error.message })
    }
});

module.exports = router;