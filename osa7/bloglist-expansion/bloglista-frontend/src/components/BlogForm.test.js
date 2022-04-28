import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('blogform calls the given prop with right details when creating a new blog', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title-input')
  const authorInput = screen.getByPlaceholderText('author-input')
  const urlInput = screen.getByPlaceholderText('url-input')

  const createButton = screen.getByText('add new blog')

  userEvent.type(titleInput, 'ABC of Testing')
  userEvent.type(authorInput, 'T. Tester')
  userEvent.type(urlInput, 'www.testing-basics.com')

  userEvent.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('ABC of Testing')
  expect(createBlog.mock.calls[0][0].author).toBe('T. Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testing-basics.com')
})
