import React from 'react'

const BlogForm = ({title, author, url, addBlog, handleTitleChange, handleAuthorChange, handleUrlChange}) => {
    return(
        <form onSubmit={addBlog}>
        <div> title: <input value={title} onChange={handleTitleChange}/> </div>
        <div> author: <input value={author} onChange={handleAuthorChange} /> </div>
        <div> url: <input value={url} onChange={handleUrlChange} /> </div>
        <div> <button type="submit"> add new blog </button> </div>
      </form>
    );
};

export default BlogForm