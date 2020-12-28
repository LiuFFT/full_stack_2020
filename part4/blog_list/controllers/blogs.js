const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user',{ username: 1, name: 1 })
    await response.json(blogs.map(blog => blog.toJSON()))
})


blogRouter.post('/', async (request, response,next) => {
    const body = request.body

    console.log("token:",request.token)

    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

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
        user.blogs = user.blogs.concat(saveBlog._id)
        await user.save()


        response.json(saveBlog.toJSON())
    }catch (e) {
        next(e)
    }
})


blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog){
        await response.json(blog.toJSON())
    }else {
        await response.status(404).end()
    }
})

blogRouter.delete('/:id', async (request, response,next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" })
        }

        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() !== user.id.toString()) {
            return response.status(401).json({
                error: 'only the owners could delete their blogs'
            })
        }else {
            await blog.remove()
            user.blogs = user.blogs.filter(blog => {
                if (blog.id.toString() !== request.params.id.toString()){
                    return blog
                }
            }
            )

            await user.save()
            response.status(204).end()
        }

    }catch (e) {
        next(e)
    }
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