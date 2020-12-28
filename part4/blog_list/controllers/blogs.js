const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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


blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog){
        await response.json(blog.toJSON())
    }else {
        await response.status(404).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id,newBlog,{ new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogRouter