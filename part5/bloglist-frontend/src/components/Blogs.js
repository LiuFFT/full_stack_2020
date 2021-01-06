import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleUpdateBlog,handleDelete, user }) => {



    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} handleDelete={handleDelete} user={user}/>
            )}
        </div>
    )
}

export default Blogs