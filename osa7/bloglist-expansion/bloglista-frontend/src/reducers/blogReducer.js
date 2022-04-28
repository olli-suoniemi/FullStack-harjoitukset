const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'APPEND':
      return [...state, action.data]
    case 'SET-BLOGS':
      return action.data.blogs
    default:
      return state
  }
}

export const appendBlog = (blog, user) => {
  return {
    type: 'APPEND',
    data: {
      ...blog,
      user,
    },
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET-BLOGS',
    data: {
      blogs: blogs,
    },
  }
}

export default blogReducer
