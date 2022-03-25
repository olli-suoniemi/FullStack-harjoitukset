import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LogInForm'
import LogOutForm from './components/LogOutForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        getAllBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const getAllBlogs = async () => {
        const blogs = await blogService.getAll()
        const sortedBlogs = await sortBlogs(blogs)
        setBlogs(sortedBlogs)
    }

    const sortBlogs = async (blogsToBeSorted) => {
        const blogs = blogsToBeSorted.sort((a, b) =>
            (a.likes > b.likes) ? -1 : 1)
        return blogs
    }

    const notify = (message, type='info') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            notify('wrong credentials', 'alert')
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const response = await blogService.create(blogObject)
            setBlogs(blogs.concat(response))
            notify('Added a new blog')
        } catch (error) {
            notify('Blog must contain author, title and url', 'alert')
        }
    }

    const addLike = async (id, blog) => {
        try {
            await blogService.update(id, blog)
            await getAllBlogs()
        } catch (error) {
            notify('Blog is deleted', 'alert')
        }
    }

    const deleteBlog = async (blog) => {
        try {
            const result = window.confirm(`Do you really want to delete the blog ${blog.title}`)
            if (result) {
                await blogService.deleteBlog(blog.id)
            }
            await getAllBlogs()
        } catch (error) {
            notify('Blog already deleted', 'alert')
        }

    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification notification={notification} />

            {user === null ?

                <LoginForm loginUser={handleLogin} />

                :

                <div>
                    <LogOutForm handleLogout={handleLogout} />

                    <p>{user.name} logged in</p>

                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            createLike={addLike}
                            deleteBlog={deleteBlog}
                            user={user}
                        />
                    )}

                    <div>
                        <Togglable buttonLabelShow="new blog" buttonLabelHide='cancel' ref={blogFormRef}>
                            <BlogForm createBlog={addBlog} />
                        </Togglable>
                    </div>
                </div>
            }

        </div>
    )
}

export default App