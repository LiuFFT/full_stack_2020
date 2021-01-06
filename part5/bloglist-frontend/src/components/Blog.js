import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ handleDelete, blog, handleUpdateBlog , user }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    return (
        <div>
            <div className='blogBasic'>
                {blog.title}, {blog.author} <button style={hideWhenVisible} onClick={toggleVisibility}>View</button> <button style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
            </div>
            <div className='blogDetail'>
                {visible ?
                    <div>
                        {blog.url}<br/>
                            likes {blog.likes} <button id='likeButton' onClick={() => handleUpdateBlog(blog)}>like</button><br/>
                        {blog.user.username}<br/>
                        {user.username === blog.user.username &&
                            <div> <Button text="delete" onClick={() => handleDelete(blog.id)}/> </div>
                        }
                    </div>
                    : ''}
            </div>
        </div>
    )
}

export default Blog
