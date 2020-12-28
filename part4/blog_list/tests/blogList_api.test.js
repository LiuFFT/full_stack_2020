const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('When there are initially some blogs saved', () => {

    test('blogs number is correct', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('id is defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })


})

describe('Add a new blog', ()=>{

    test('test add a blog', async () => {
        const newBlog = {
            title: "test",
            author: "lzk",
            url: "https://testblog.test/",
            likes: 7,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)

        const urls = blogsAtEnd.map(b => b.url)
        expect(urls).toContain("https://testblog.test/")
    })

    test('addition without likes, default should be 0', async ()=>{
        const newBlog = {
            title: "test",
            author: "lzk",
            url: "https://testblog.test/",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const added = blogsAtEnd.find(b => {
            if (b.url === newBlog.url){
                return b
            }
        })

        console.log(added)

        expect(added.likes).toBe(0)

    })

    test('url or/and title missing',async () => {
        let newBlog = {
            author: "lzk",
            url: "https://testblog.test/",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        newBlog = {
            title: "test",
            author: "lzk",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        newBlog = {
            author: "lzk",
            likes: 7,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)


    })
})


describe('Delete a blog', ()=>{
    test('delete a blog, if succeed, return 204', async ()=>{
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogAtEnd = await helper.blogsInDb()

        expect(blogAtEnd.length).toBe(helper.initialBlogs.length-1)

        const urls = blogAtEnd.map(b => b.url)

        expect(urls).not.toContain(blogToDelete.url)

    })
})

afterAll(() => {
    mongoose.connection.close()
})