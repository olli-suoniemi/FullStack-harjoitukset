import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery } from '@apollo/client'
import { ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [filter, setFilter] = useState('')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()
  const me = useQuery(ME, {
    skip: !token
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(me.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        {token ? <>Welcome {me.data.me.username}! </> : null}
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={logout}>logout</button>
          </>
          : 
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} token={token}/>

      <Books 
        show={page === 'books'}
        filter={filter}
        setFilter={setFilter}
      />

      <NewBook 
        show={page === 'add'}
        setFilter={setFilter}
      />

      {token ? <><Recommendations show={page === 'recommendations'} me={me} /></> : null}

      <Login show={page === 'login'} setToken={setToken}/>
    </div>
  )
}

export default App
