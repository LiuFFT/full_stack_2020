import React,{useState} from 'react'
import Button from "./Button";

const BlogDetail = ({blog}) => (
    <div>
        {blog.url}<br/>
        likes {blog.likes} <Button text="like"/><br/>
        {blog.user.username || null}<br/>
    </div>
)


const Blog = ({ blog }) => {

    const [show, setShow] = useState(false)

    const handleClick = () =>{
        setShow(!show)
    }

    return (
        <div>
            {blog.title}, {blog.author} <Button onClick={handleClick} text="show"/>
            <div>
                {show ? <BlogDetail blog={blog}/> : ''}
            </div>
        </div>
    )
}

export default Blog
