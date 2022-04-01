import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    author: 'Test-Man',
    title: 'Art of Testing',
    url: 'www.Best-Test.com',
    likes: 5,
    user: {
        username: 'asdf',
        name: 'asdf'
    }
}

const user = {
    username: 'asdf',
    name: 'asdf'
}

test('by default renders author and title NOT url and likes', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
        blog.author, blog.title
    )

    expect(div).not.toHaveTextContent(
        blog.url, blog.likes
    )
})

test('renders url and likes after pressing the button that shows them', () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.blog_with_details')

    const button = screen.getByText('view')

    userEvent.click(button)

    expect(div).toHaveTextContent(
        blog.url, blog.likes
    )
})

test('pressing like button twice triggers buttonhandler twice', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={user} createLike={mockHandler} />)

    const button = screen.getByText('like')

    userEvent.click(button)
    userEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

})

