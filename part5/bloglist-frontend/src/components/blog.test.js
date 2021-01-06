import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
// eslint-disable-next-line no-unused-vars
import { prettyDOM } from '@testing-library/dom'
import NewBlogForm from "./NewBlogForm";

const user = {
    id:'5fe995620294251764327e77',
    username: 'root',
    name:'root',
    password:'root',
    token: 'token',
}

const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user : {
        id:'5fe995620294251764327e77',
        username: 'root',
        name:'root',
        password:'root',
        token: 'token',
    }
}

// eslint-disable-next-line no-unused-vars
const blogs = [
    blog
]

test('test render the title and author', () => {
    const component = render(
        <Blog blog={blog} user={user}/>
    )

    const div = component.container.querySelector('.blogBasic')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
})

test('test render url and likes', async () => {
    const component = render(
        <Blog blog={blog} user={user}/>
    )

    const button = component.getByText('View')

    fireEvent.click(button)

    const compDiv = await component.container.querySelector('.blogDetail')
    console.log(compDiv)
    expect(compDiv).toHaveTextContent(blog.url)
    expect(compDiv).toHaveTextContent(blog.likes)
})

test('test click twice', async () => {
    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} handleUpdateBlog={mockHandler}/>
    )

    const view = component.getByText('View')
    fireEvent.click(view)
    fireEvent.click(component.getByText('like'))
    fireEvent.click(component.getByText('like'))


    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('test create new blog', async () => {
    const createBlog = jest.fn()

    const component = render(
        <NewBlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, {
        target: { value: 'lzk' }
    })

    fireEvent.change(title, {
        target: { value: 'test create new blog' }
    })

    fireEvent.change(url, {
        target: { value: 'www.create.blog' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0].title).toBe('test create new blog' )
    expect(createBlog.mock.calls[0][0].author).toBe('lzk' )
    expect(createBlog.mock.calls[0][0].url).toBe('www.create.blog' )
    
})

