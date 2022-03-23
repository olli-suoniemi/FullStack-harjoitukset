const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "author": "Matias Tonttu",
        "title": "Mettäsväen salaisuudet",
        "url": "www.elf-world.com",
        "likes": "50"
    },
    {
        "author": "Leena Tonttu",
        "title": "Mettäsväen keittiöherkut",
        "url": "www.elf-kitchen.com",
        "likes": "100"
    },
    {
        "author": "Kalle Tonttu",
        "title": "Mettäsväen Painitreenit",
        "url": "www.elf-wrestling.com"
    }
]

const initialUsers = [
    {
        "username": "suonieo1",
        "name": "Olli Suoniemi"
    },
    {
        "username": "T. Dodge",
        "name": "sjukoks"
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb,
}