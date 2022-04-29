import { useMutation, useQuery } from '@apollo/client'
import React, { Component, useState } from 'react'
import Select from 'react-select'

import { ALL_AUTHORS, UPDATE_AUTHOR } from './../queries'

const BirthYear = (props) => {
  const [name, setName] = useState()
  const [year, setYear] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const authorNames = props.authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, year }})

    setName('')
    setYear('')
  }

  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select 
          value={name ? { value: name, label: name } : null} 
          onChange={( selectedItem ) => setName(selectedItem.value)} 
          options={authorNames} >
        </Select>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}



const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BirthYear authors={authors}/>
    </div>
  )
}

export default Authors
