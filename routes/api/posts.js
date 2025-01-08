const express = require('express')
const { getPosts, createPost, updatePost, deletePost, getPost } = require('../../controllers/postControllers')
const router = express.Router()

/* router.get('/', getPosts)

router.post('/', createPost) */

/* router.put('/:id', updatePost)

router.delete('/:id', deletePost)

router.get('/:id', getPost) */

router.route('/')
    .get(getPosts)
    .post(createPost)

router.route('/:id')
    .put(updatePost)
    .delete(deletePost)
    .get(getPost)


module.exports = router