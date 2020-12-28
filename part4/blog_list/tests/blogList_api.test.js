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

describe('blogs list tests', () => {

    test('blogs number is correct', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('id is defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })


})

describe('add a new blog', ()=>{

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
})


afterAll(() => {
    mongoose.connection.close()
})