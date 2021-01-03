import React,{useState} from 'react'
import Button from "./Button";

const BlogDetail = ({blog, updateBlogLikes}) => (
    <div>
        {blog.url}<br/>
        likes {blog.likes} <Button text="like" onClick={updateBlogLikes}/><br/>
        {blog.user.username || null}<br/>
    </div>
)


const Blog = ({ blog, updateBlog }) => {

    const [show, setShow] = useState(false)

    const handleClick = () =>{
        setShow(!show)
    }

    const updateBlogLikes = async (event) => {
        updateBlog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            user: blog.user.id,
            likes: blog.likes+1,
            id: blog.id
        })
    }

    return (
        <div>
            {blog.title}, {blog.author} <Button onClick={handleClick} text="show"/>
            <div>
                {show ? <BlogDetail blog={blog} updateBlogLikes={updateBlogLikes}/> : ''}
            </div>
        </div>
    )
}

export default Blog
