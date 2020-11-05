const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    date: Date,
    author: String,
    category: String
});

module.exports = mongoose.model('post', postSchema);