import React, { useState} from 'react'
import Button from "./Button";
// import userServices from "../services/users"

// const getUser = (user) => {
//     userServices.getById(user)
//         .then(returnedUser=>{
//             console.log("returnedUser:",returnedUser)
//             return returnedUser
//         })
// }

const BlogDetail = ({blog, updateBlogLikes}) => {
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
        </div>
    )
}


const Blog = ({ blog, updateBlog }) => {

    const [show, setShow] = useState(false)

    const handleClick = () =>{
        setShow(!show)
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

    return (
        <div>
            {blog.title}, {blog.author} <Button onClick={handleClick} text="show"/>
            <div>
                {show ? <BlogDetail blog={blog}  updateBlogLikes={updateBlogLikes}/> : ''}
            </div>
        </div>
    )
}

export default Blog
