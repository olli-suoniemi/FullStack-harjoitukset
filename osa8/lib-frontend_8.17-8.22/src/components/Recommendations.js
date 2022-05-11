import { useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { ALL_BOOKS } from './../queries'

const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: props.me.data.me.favoriteGenre },
    pollInterval: 2000
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if(!props.show) {
    return null
  }

  return(
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre:</p>
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

    </div>
  )
}

export default Recommendations