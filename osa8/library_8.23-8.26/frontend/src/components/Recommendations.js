import React, { useEffect } from "react"

const Recommendations = (props) => {
  useEffect(() => {
    if(props.show) {
      props.setFilter(props.me.data.me.favoriteGenre)
    }
  }, [props])

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
          {props.books.map((a) => (
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