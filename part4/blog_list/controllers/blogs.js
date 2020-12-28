const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    await response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.url && !blog.title){
        return response.status(400).send({ error: 'url and title are missing'})
    }

    if (!blog.url && blog.title) {
        return response.status(400).send({ error: 'url is missing'})
    }

    if (!blog.title && blog.url){
        return response.status(400).send({ error: 'title is missing'})
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const saveBlog = await blog.save()
    await response.json(saveBlog.toJSON())
})

module.exports = blogRouter