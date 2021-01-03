import React from 'react'
import Blog from "./Blog";

const Blogs = ({blogs, setBlogs, handleUpdateBlog, user}) => {



    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} updateBlog={handleUpdateBlog} user={user}/>
            )}
        </div>
    )
}

export default Blogs