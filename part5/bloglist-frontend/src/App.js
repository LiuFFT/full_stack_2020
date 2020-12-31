import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import Button from "./components/Button";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [user, setUser] = useState(null)
    // const [loginVisible, setLoginVisible] = useState(false)
    const [createVisible, setCreateVisible] = useState(false)

    useEffect(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogsAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = (event) => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        const blogObj = {
            title: title,
            author: author,
            url: url
        }

        blogService
            .create(blogObj)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
            })

        setTitle("")
        setAuthor("")
        setUrl("")

        setErrorMessage(
            `a new blog ${blogObj.title} by ${blogObj.author} added`
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }


    const loginForm = () => (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const blogsForm = () => (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

    const newBlogForm = () => {
        const hideWhenVisible = { display: createVisible ? 'none' : '' }
        const showWhenVisible = { display: createVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setCreateVisible(true)}>create</button>
                </div>
                <div style={showWhenVisible}>
                    <NewBlogForm
                        title={title}
                        author={author}
                        url={url}
                        handleTitleChange={({ target }) => setTitle(target.value)}
                        handleAuthorChange={({ target }) => setAuthor(target.value)}
                        handleUrlChange={({ target }) => setUrl(target.value)}
                        handleCreateBlog={handleCreateBlog}
                    />
                    <button onClick={() => setCreateVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }


    return (
      <div style={{margin:20}}>
          <Notification message={errorMessage}/>
          <div>
              <div>
                  {user === null ?
                      loginForm() :
                      <div>
                          <p>{user.name} logged-in <Button text="logout" onClick={(event)=>handleLogout(event)} /></p>
                          {newBlogForm()}
                          {blogsForm()}
                      </div>
                  }
              </div>
          </div>
      </div>
    )
}

export default App