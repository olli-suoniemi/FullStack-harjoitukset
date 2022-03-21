const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    
    const user = request.user

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
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
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

blogRouter.delete('/:id', async (request, response) => {
    const body = request.body
    const user = request.user
    
    const blog = await Blog.findById(request.params.id);

    if ( !blog ) {
        return response.status(401).json( {error: "Invalid blog, it doesn't exist"})
    }
    
    if ( user._id.toString() !== blog.user.toString() ) {
        return response.status(405).json( {error: "Deletion of a blog failed due to user haven't created this blog" })
    } else {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    
    await Blog.findByIdAndUpdate(request.params.id, blog)
    response.status(204).end()
})

module.exports = blogRouter
  