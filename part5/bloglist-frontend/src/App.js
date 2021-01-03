import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import Button from "./components/Button";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)

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

    const handleCreateBlog = (blogObj) => {
        blogService
            .create(blogObj)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
            })


        setErrorMessage(
            `a new blog ${blogObj.title} by ${blogObj.author} added`
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleUpdateBlog = (blogObj) => {
        console.log(blogObj)
        blogService
            .update(blogObj)
            .then(returnedBlog => {
                setBlogs(blogs.map(b => b.id !== blogs.id ? b : returnedBlog))
            })
            .catch(error => {
                setErrorMessage(
                    `Blog '${blogObj.title}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
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
                <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} />
            )}
        </div>
    )

    const newBlogForm = () => (
        <Togglable buttonLabel="Create">
            <NewBlogForm
                createBlog={handleCreateBlog}
            />
        </Togglable>
    )


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