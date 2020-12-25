const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(notes => {
        response.json(notes.map(note => note.toJSON()))
    })
})

blogRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogRouter