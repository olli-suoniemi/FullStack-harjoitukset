const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.title === undefined & body.url === undefined) {
        response.status(400).end()
    } else {

        if (body.likes === undefined) {
            body.likes = 0
        }
    
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })

        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)

    }
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
  }
})

module.exports = blogRouter
  