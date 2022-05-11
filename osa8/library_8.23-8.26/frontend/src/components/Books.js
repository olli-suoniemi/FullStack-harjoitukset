import { useState } from 'react'

const Books = (props) => {
  const [genres, setGenres] = useState([])

  props.books.map((book) => (
    book.genres.map((genre) => {
      if(!genres.includes(genre)) {
        setGenres(genres.concat(genre))
      }
    })
  ))

  if (!props.show) {
    return null
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
          {props.books.map((a) => (
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
      <button onClick={() => props.setFilter('')}>all genres</button>
    </div>
  )
}

export default Books
