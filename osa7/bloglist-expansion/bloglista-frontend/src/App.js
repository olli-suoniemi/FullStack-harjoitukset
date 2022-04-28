import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LogInForm'
import LogOutForm from './components/LogOutForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { appendBlog, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import Blog from './components/Blog'
import { 
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector((state) => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userFromCookies = JSON.parse(loggedUserJSON)
      dispatch(setUser(userFromCookies))
      blogService.setToken(userFromCookies.token)
    }
  }, [])

  useEffect(() => {
    getAllBlogsSorted()
  }, [])

  const getAllBlogsSorted = async () => {
    const blogs = await blogService.getAll()
    const sortedBlogs = await sortBlogs(blogs)
    dispatch(setBlogs(sortedBlogs))
  }

  const sortBlogs = async (blogsToBeSorted) => {
    const blogs = blogsToBeSorted.sort((a, b) => (a.likes > b.likes ? -1 : 1))
    return blogs
  }

  const addLikeORComment = async (id, blog) => {
    try {
      await blogService.update(id, blog)
      getAllBlogsSorted()
    } catch (error) {
      dispatch(notify('Blog is deleted', 'alert'))
      setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(notify(`Welcome ${user.username}!`))
      setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
      navigate('/')
    } catch (exception) {
      dispatch(notify('wrong credentials', 'alert'))
      setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(blogObject)
      dispatch(appendBlog(response, user))
      dispatch(notify('Added a new blog'))
      setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
    } catch (error) {
      dispatch(notify('Creation of new blog failed!', 'alert'))
      setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const result = window.confirm(
        `Do you really want to delete the blog ${blog.title}`
      )
      if (result) {
        await blogService.deleteBlog(blog.id)
      }
      getAllBlogsSorted()
      dispatch(notify('Blog deleted!'))
      setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
    } catch (error) {
      dispatch(notify('Blog already deleted', 'alert'))
      setTimeout(() => {
        dispatch(notify(null))
      }, 5000)
    }
  }

  const padding = {
    padding: 10,
  }

  return (
    <Container>
      <div>
        {user === null ? (
          <>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Button color="inherit" component={Link} to="/login">
                  login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>  
              </Toolbar>
            </AppBar>

            <Notification />
            
            <Routes>
              <Route
                path="/users"
                element={
                  <>
                    <h2>Users that have registered to the blog app:</h2>
                    <Users />
                  </>
                }
              />
              <Route path="/users/:id" element={<UserInfo />} />
              <Route path="/" element={<Blogs />} />
              <Route
                path="/blogs/:id"
                element={<Blog createComment={addLikeORComment} />}
              />
              <Route
                path="/login"
                element={<LoginForm loginUser={handleLogin} />}
              />
            </Routes>
          </>
        ) : (
          <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <div style={padding}>
                  <em>{user.name} logged in</em>
                </div>
                <Button color="inherit" component={Link} to="/">
                  blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                <LogOutForm handleLogout={handleLogout} />
              </Toolbar>
            </AppBar>
            

            <Notification />

            <Routes>
              <Route
                path="/users"
                element={
                  <>
                    <h1>users</h1>
                    <Users />
                  </>
                }
              />
              <Route path="/users/:id" element={<UserInfo />} />
              <Route
                path="/blogs/:id"
                element={
                  <BlogInfo
                    createLike={addLikeORComment}
                    deleteBlog={deleteBlog}
                    user={user}
                    createComment={addLikeORComment}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <h1>Welcome to blog app!</h1>
                    <Togglable
                      buttonLabelShow="new blog"
                      buttonLabelHide="cancel"
                      ref={blogFormRef}
                    >
                      <BlogForm createBlog={addBlog} />
                    </Togglable>
                    <Blogs />
                  </>
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Container>
  )
}

export default App