const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}