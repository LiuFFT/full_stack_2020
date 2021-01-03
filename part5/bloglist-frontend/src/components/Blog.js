import React,{useState} from 'react'
import Button from "./Button";
import userServices from "../services/users"

const getUser = async (user) => {
    if (typeof(user) ==='object'){
        userServices.getById(user.id)
            .then(returnedUser=>{
                return returnedUser
            })
    }else if (typeof(user) === 'string'){
        userServices.getById(user)
            .then(returnedUser=>{
                return returnedUser
            })
    }
}

const BlogDetail = ({blog, updateBlogLikes}) => {
    let userObj = blog.user

    console.log(blog.user.name)
    if (blog.user.name === "undefined"){
        userObj = getUser(blog.user)
        console.log(userObj)
    }

    return (
        <div>
            {blog.url}<br/>
            likes {blog.likes} <Button text="like" onClick={updateBlogLikes}/><br/>
            {userObj.name || null}<br/>
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
