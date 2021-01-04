import React, { useState } from 'react'
import Button from './Button'
// import userServices from "../services/users"
import blogServices from '../services/blogs'

// const getUser = (user) => {
//     userServices.getById(user)
//         .then(returnedUser=>{
//             console.log("returnedUser:",returnedUser)
//             return returnedUser
//         })
// }

// eslint-disable-next-line no-unused-vars
const BlogDetail = ({ blog, updateBlogLikes, user, handleDelete }) => {
    // const [blogOwner, setBlogOwner] = useState(null)
    //
    // useEffect(()=>{
    //     userServices.getById(blog.user.id)
    //         .then(returnedUser=>{
    //             console.log("returnedUser:",returnedUser)
    //             setBlogOwner(returnedUser)
    //         })
    // })

    // let userObj = blog.user
    //
    // console.log("blog:",blog)
    // if (!blog.user.name) {
    //     console.log("blog.user:",blog.user)
    //     userServices.getById(blog.user)
    //         .then(returnedUser=>{
    //             console.log("returnedUser:",returnedUser)
    //             userObj = returnedUser
    //         })
    //     console.log("userObj:",userObj)
    // }

    return (
        <div>
            {blog.url}<br/>
            likes {blog.likes} <Button text="like" onClick={updateBlogLikes}/><br/>
            {blog.user.name}<br/>
            {user !== null && user.name === blog.user.name &&
                <div> <Button text="delete" onClick={() => handleDelete(blog.id)}/> </div>
            }
        </div>
    )
}


const Blog = ({ blogs, setBlogs, blog, updateBlog , user }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    const updateBlogLikes = () => {
        updateBlog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            user: blog.user,
            likes: blog.likes+1,
            id: blog.id
        })
    }

    const handleDelete = (id) => {
        const blogToDelete = blogs.find(b => b.id === id)
        if (window.confirm(`Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'?`)) {
            blogServices
                .deleteBlog(id)
                .then(() => {
                    setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))
                })
        }
    }

    return (
        <div>
            <div className='blogBasic'>
                {blog.title}, {blog.author} <button style={hideWhenVisible} onClick={toggleVisibility}>View</button> <button style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
            </div>
            <div>
                {visible ? <BlogDetail blog={blog}  user={user} handleDelete={handleDelete} updateBlogLikes={updateBlogLikes}/> : ''}
            </div>
        </div>
    )
}

export default Blog
