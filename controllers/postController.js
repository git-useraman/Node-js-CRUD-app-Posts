/* const data = {
    posts: require('../model/posts.json'),
    setPosts: function(data) { this.posts = data }
} */

const Post = require('../model/Post')

const getPosts = async (req, res, next) => {
    const posts = await Post.find().exec();

    if (!posts) {
        const error = new Error(`No posts found`);
        error.status = 204;
        return next(error)
    }
    res.json(posts);
}

const getPost = async (req, res, next) => {
    const _id = req.params.id;
    // const post = data.posts.find(post => post.id === id)
    const post = await Post.findOne({ _id }).exec()

    if(!post) {
        const error = new Error(`A post with the id ${id} not found`)
        error.status = 404;
        return next(error)
    }
    res.json(post)
}

const createPost = async (req, res, next) => {
    // const id = data.posts ? data.posts.length + 1 : 1;
    
    if(!req.body.title) {
        const error = new Error(`Please include a title`)
        error.status = 400;
        return next(error)
    }
    
    const result = await Post.create({
        title: req.body.title
    });
    // data.setPosts([...data.posts, newPost])
    res.status(201).json(await Post.find())
}

const updatePost = async (req, res, next) => {
    const _id = req.params.id
    // const post = data.posts.find(post => post.id === id)
    const post = await Post.findOne({ _id }).exec()

    if(!post) {
        const error = new Error(`A post with the id ${id} not found`)
        error.status = 404;
        return next(error)
    }
    post.title = req.body.title ? req.body.title : "No Title";
    const result = await post.save()
    res.json(result)
}

const deletePost = async (req, res, next) => {
    const _id = req.params.id
    // const post = data.posts.find(post => post.id === id)
    const post = await Post.findOne({ _id }).exec()

    if(!post) {
        const error = new Error(`A post with the id ${id} not found`)
        error.status = 404;
        return next(error)
    }
    // data.posts = data.posts.filter(post => post.id !== id)
    await Post.deleteOne({ _id }).exec()
    res.json(await Post.find())
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}