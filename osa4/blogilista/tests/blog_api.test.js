const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    expect(authors).toContain(
        'Matias Tonttu'
    )
})

test('identifying field is called "id" and it contains correct id', async () => {
    const blogs = await helper.blogsInDb()
    const response = await api.get(`/api/blogs/${blogs[0].id}`)
    expect(response.body.id).toBeDefined()
})

test('a valid blog can be added', async() => {
    const newBlog = {
        "author": "Matilda Tonttu",
        "title": "Mettäsväen juttuja",
        "url": "www.elf-things.com",
        "likes": "14"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.map(blog => blog.author)
    expect(authors).toContain("Matilda Tonttu")
})

test('a blog without like-field will be changed to a blog with like-field with 0 likes', async() => {
    const newBlog = {
        "author": "Torttu Tonttu",
        "title": "Mettäsväen torttuja",
        "url": "www.elf-turds.com"
    }

    const resp = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    expect(resp.body.likes).toBeDefined()
    expect(resp.body.likes).toEqual(0)
})

test('a blog without title and url -fields will return "400 bad request"', async() => {
    const newBlog = {
        "author": "Laiska Tonttu",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})