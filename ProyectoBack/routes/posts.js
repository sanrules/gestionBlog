var express = require('express');
const Post = require('../models/Post');
var moment = require('moment');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.render("post/index.pug", { posts });
  } catch (error) {
    console.log("Error getting posts ", error);
  }
});

router.get('/new', (req, res) => {
  res.render("post/new.pug");
});

router.post('/new', async (req, res) => {
  const post = req.body;
  post.date = moment().toDate();

  try {
    await Post.create(post);
    res.redirect('posts');
  } catch (error) {
    console.log("Error creating new post ", error);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("Post: ", post);
    res.render("post/edit", { post });
  } catch (error) {
    console.log("Error editing post with id: ", req.params.id, " ", error);
  }
});

router.post('/update', async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.body._id);
    const post = req.body;
    post.date = moment().toDate();
    await Post.findByIdAndUpdate(req.body._id, post, { useFindAndModify: false });
    res.redirect('/posts');
  } catch (error) {
    console.log("Error updating post with id: ", req.body._id, " ", error);
  }

});

router.get('/delete/:id', async (req, res) => {
  try {
    await Post.findOneAndRemove(req.params.id);
    res.redirect('posts');
  } catch (error) {
    console.log('Error deleting post with id: ', req.params.id, " ", error)
  }
});

module.exports = router;
