import React from 'react'
import { useState } from 'react'

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
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                title: <input id='title-input' value={title} onChange={handleTitleChange} placeholder='title-input'/>
                author: <input id='author-input' value={author} onChange={handleAuthorChange} placeholder='author-input'/>
                url: <input id='url-input' value={url} onChange={handleUrlChange} placeholder='url-input'/>
                <button id='submit-button' type="submit"> add new blog </button>
            </form>
        </div>
    )
}

export default BlogForm