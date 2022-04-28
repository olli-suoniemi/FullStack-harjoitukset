const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!request.body || !request.body.author || !request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'the blog is missing vital information' })
  }

  const { title, url, likes } = request.body

  const existingBlogByTitle = await Blog.findOne({ title })

  if (existingBlogByTitle) {
    return response.status(400).json({ error: 'the blog with this title already exists' })
  }

  const existingBlogByUrl = await Blog.findOne({ url })

  if (existingBlogByUrl) {
    return response.status(400).json({ error: 'the blog with this url already exists' })
  }

  if (!likes) {
    request.body = { ...request.body, likes: 0 }
  }

  request.body = { ...request.body, comments: [] }
  
  const user = request.user

  const blog = new Blog({ ...request.body, user: user.id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete ) {
    return response.status(204).end()
  }

  if ( blogToDelete.user && blogToDelete.user.toString() !== request.user.id ) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )
      
  response.json(updatedBlog)
})

router.put('/:id/comments', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )
      
  response.json(updatedBlog)

})

module.exports = router