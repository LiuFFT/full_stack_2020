import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })


        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new blogs</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id='create-button' type="submit">Create</button>
            </form>
        </div>
    )
}

export default NewBlogForm