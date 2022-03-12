const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
 
    await Blog.insertMany(helper.initialBlogs)
  })

describe('testing blogs:', () => {
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
    
        expect(authors).toContain(helper.initialBlogs[0].author)
    })
    
    test('identifying field is called "id"', async () => {
        const blogs = await helper.blogsInDb()
        const response = await api.get(`/api/blogs/${blogs[0].id}`)
        expect(response.body.id).toBeDefined()
    })
    
    test('a valid blog can be added', async() => {
        const users = await helper.usersInDb()

        const newBlog = {
            "author": "Matilda Tonttu",
            "title": "Mettäsväen juttuja",
            "url": "www.elf-things.com",
            "likes": 14,
            "userId": users[0].id
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
        const users = await helper.usersInDb()

        const newBlog = {
            "author": "Torttu Tonttu",
            "title": "Mettäsväen torttuja",
            "url": "www.elf-turds.com",
            "userId": users[0].id
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
    
    test('deletion of a blog succeeds with status code 204 if deletion id is valid', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
    
        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).not.toContain(blogToDelete.author)
    })
    
    test('updation of a blog succeeds with status code 204 if updation id is valid', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate= blogsAtStart[0]
    
        const newBlog = {
            "author": "Matias Tonttu",
            "title": "Mettäsväen salaisuudet",
            "url": "www.elf-world.com",
            "likes": 75
        }
    
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0]
    
        expect(updatedBlog.likes).toEqual(newBlog.likes)
    })
})

describe('testing users:', () => {
      test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'tester',
          name: 'Test Testman',
          password: 'secret',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with a password that is shorter than 3-characters', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'test',
          name: 'Test Testman',
          password: 'se',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})



afterAll(() => {
  mongoose.connection.close()
})