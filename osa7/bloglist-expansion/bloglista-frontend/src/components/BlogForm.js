import React from 'react'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <TextField
            id="title-input"
            label="title"
            value={title} onChange={handleTitleChange}
          />
          <TextField
            id="author-input"
            label="author"
            value={author} onChange={handleAuthorChange}
          />
          <TextField
             id="url-input" 
             label="url"
             value={url} onChange={handleUrlChange}
          />
        </div>
        <Button id="submit-button" type="submit" variant="contained">
          {' '}
          submit{' '}
        </Button>
      </form>
      <br></br>
    </div>
  )
}

export default BlogForm
