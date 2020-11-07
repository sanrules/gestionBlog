const router = require('express').Router();
const Post = require('../models/Post');
const moment = require('moment');
const { check, validationResult } = require('express-validator');

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.log("Error obtaining all the posts. ", error);
        res.status(500).json({ error: error.message })
    }
});

router.get('/posts/:id', check("id").isMongoId(), async (req, res) => {

    const erroresValidacion = validationResult(req);
    if (!erroresValidacion.isEmpty()) {
        return res.json(erroresValidacion.array());
    }

    try {
        console.log(req.params.id);
        const post = await Post.findById(req.params.id);
        console.log(post);
        res.json(post);
    } catch (error) {
        console.log("Error obtaining the post. ", error);
        res.status(500).json({ error: error.message })
    }
});

router.post('/posts', [
    check('title').notEmpty(),
    check('category').notEmpty(),
    check('author').notEmpty(),
], async (req, res) => {

    const erroresValidacion = validationResult(req);
    if (!erroresValidacion.isEmpty()) {
        return res.json(erroresValidacion.array());
    }

    try {
        let newPost = req.body;
        newPost.date = moment().toDate();
        const post = await Post.create(newPost);
        res.json({ success: "Post created", post: post });
    } catch (error) {
        console.log("Error creating the posts. ", error);
        res.status(422).json({ error: error.message })
    }
});

router.put('/posts', async (req, res) => {

    const erroresValidacion = validationResult(req);
    if (!erroresValidacion.isEmpty()) {
        return res.json(erroresValidacion.array());
    }

    try {
        const post = await Post.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: "Post updated", post: post });
    } catch (error) {
        console.log("Error updating the post. ", error);
        res.status(422).json({ error: error.message })
    }
});

router.delete('/posts/:id', check('id').isMongoId(), async (req, res) => {

    const erroresValidacion = validationResult(req);
    if (!erroresValidacion.isEmpty()) {
        return res.json(erroresValidacion.array());
    }

    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.json({ success: "Post deleted", post: post });
    } catch (error) {
        console.log("Error deleting the post. ", error);
        res.status(422).json({ error: error.message })
    }
});

module.exports = router;