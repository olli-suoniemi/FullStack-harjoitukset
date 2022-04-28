import blogService from '../services/blogs'
import userService from '../services/users'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Button,
  TextField,
  Typography,
  Grid,
  styled
} from '@mui/material';

const BlogInfo = ({ createLike, deleteBlog, user, createComment }) => {
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')
  const [dummy, setDummy] = useState(null)
  const [username, setUsername] = useState(null)
  const id = useParams().id
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getById(id).then((response) => {
      setBlog(response)
    })
  }, [dummy])

  const addLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: Number(blog.likes) + 1,
      user: blog.user.id,
      comments: blog.comments,
    }
    createLike(blog.id, blogObject)
    setDummy(!dummy)
  }

  const addComment = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: Number(blog.likes),
      user: blog.user.id,
      comments: blog.comments.concat(comment),
    }
    createComment(id, blogObject)
    setDummy(!dummy)
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    await deleteBlog(blog)
    navigate('/')
  }

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  if (!blog || !user) {
    return null
  }

  userService.getById(blog.user).then((response) => {
    setUsername(response.username)
  })

  if (!username) {
    return null
  }

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
        {blog.title}
      </Typography>
      <a href={blog.url}> <Typography> {blog.url} </Typography></a> 
      <Typography> {blog.likes} likes <Button id="like-button" variant="contained" onClick={addLike}>
        like
      </Button></Typography>
      <Typography> added by {username}</Typography>

      <List>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Comments
        <Divider />
        </Typography>
        {blog.comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${comment}`}/>
          </ListItem>
        ))}
      </List>

      <form onSubmit={addComment}>
          <TextField
            id="comment"
            value={comment} onChange={handleCommentChange}
          />
          <Button type="submit" variant="contained" >add comment</Button>
      </form>
      
      <div>
        {user.username === username ? (
          <Button id="delete-button" variant="contained" color="error" onClick={removeBlog}>
            delete blog
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default BlogInfo
