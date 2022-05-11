import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { ALL_BOOKS } from './../queries'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: props.filter },
    pollInterval: 2000
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (books) {
      books.map((book) => (
        book.genres.map((genre) => {
          if(!genres.includes(genre)) {
            setGenres(genres.concat(genre))
          }
        })
      ))
    }
  }, [books, genres])

  console.log(books);

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>
      <h2>books</h2>
      <p>loading books...</p>
      </div>
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    props.setFilter(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre, index) => (
        <button key={index} onClick={handleFilterChange} value={genre}> {genre} </button>
      ))}
    </div>
  )
}

export default Books
