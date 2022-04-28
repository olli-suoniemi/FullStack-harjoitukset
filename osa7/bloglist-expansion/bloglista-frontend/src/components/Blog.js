import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import userService from '../services/users'
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

const Blog = ({ createComment }) => {
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')
  const [dummy, setDummy] = useState(null)
  const [username, setUsername] = useState(null)
  const id = useParams().id

  useEffect(() => {
    blogService.getById(id).then((response) => {
      setBlog(response)
    })
  }, [dummy])

  if (!blog) {
    return null
  }

  userService.getById(blog.user).then((response) => {
    setUsername(response.username)
  })

  if (!username) {
    return null
  }

  const addComment = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: Number(blog.likes),
      user: blog.user,
      comments: blog.comments.concat(comment),
    }
    createComment(id, blogObject)
    setDummy(!dummy)
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
        {blog.title}
      </Typography>
      <a href={blog.url}> <Typography> {blog.url} </Typography></a> 
      <Typography> {blog.likes} likes </Typography>
      <Typography> added by {username} </Typography>

      <form onSubmit={addComment}>
          <TextField
            id="comment"
            value={comment} onChange={handleCommentChange}
          />
          <Button type="submit" variant="contained" >add comment</Button>
      </form>

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

    </div>
  )
}

export default Blog
