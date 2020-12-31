import React from "react";

const NewBlogForm = ({
                         handleCreateBlog,
                         handleTitleChange,
                         handleAuthorChange,
                         handleUrlChange,
                         title,
                         author,
                         url

    }) => {
    return (
        <div>
            <h2>create new blogs</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default NewBlogForm