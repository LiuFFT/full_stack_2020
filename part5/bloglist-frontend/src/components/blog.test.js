import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from "./Blog";

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
    userId:'5fe995620294251764327e77'
}

const blogs = [
    blog
]

test('test render the title and author', ()=>{
    const component = render(
        <Blog blogs={blogs} blog={blog} user={user}/>
    )

    const div = component.container.querySelector('.blogBasic')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
})