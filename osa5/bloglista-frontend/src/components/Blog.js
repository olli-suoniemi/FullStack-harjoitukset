import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, createLike, deleteBlog, user }) => {
    const [visible, setVisible] = useState(false)

    const hidden = { display: visible ? 'none' : '' }
    const showing = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const addLike = async (event) => {
        event.preventDefault()
        const blogObject = {
            author: blog.author,
            title: blog.title,
            url: blog.url,
            likes: Number(blog.likes) + 1,
            user: blog.user.id
        }
        createLike(blog.id, blogObject)
    }

    const removeBlog = async (event) => {
        event.preventDefault()
        await deleteBlog(blog)
    }

    return(
        <div style={blogStyle}>
            <div style={hidden}>
                {blog.title}
                <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showing}>
                {blog.title} <button onClick={toggleVisibility}>hide</button> <br></br>
                {blog.author} <br></br>
                {blog.url}  <br></br>
        likes: {blog.likes} <button onClick={addLike}>like</button> <br></br>
                <div>
                    {user.username === blog.user.username && (
                        <button onClick={removeBlog}>delete blog</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blog