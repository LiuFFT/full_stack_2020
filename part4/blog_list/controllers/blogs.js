const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    await response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const saveBlog = await blog.save()
    await response.json(saveBlog.toJSON())
})

module.exports = blogRouter