const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String
    }
});

module.exports = mongoose.model('Post', postSchema)