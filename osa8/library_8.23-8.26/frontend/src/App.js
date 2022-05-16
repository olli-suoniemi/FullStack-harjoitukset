import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, (data) => {
    console.log('data:', data);     // why data is null?
    return {
      allBooks: uniqByName(data.allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [filter, setFilter] = useState('')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()
  const me = useQuery(ME, {
    skip: !token
  })
  const bookResult = useQuery(ALL_BOOKS, { 
    variables: { genre: filter } 
  })

  useEffect(() => {
    if (page !== 'recommendations')
      setFilter('')
  }, [page])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log('addedBook:', addedBook);
      window.alert('New book got added!')
      client.cache.updateQuery({ query: ALL_BOOKS }, data => {
        console.log('data:', data);   // data is null?
      })
      // updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  
  if(me.loading || bookResult.loading) {
    return <div>loading...</div>
  } 

  if(!token) {
    return(
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} token={null}/>
        <Books show={page === 'books'} filter={filter} setFilter={setFilter} books={bookResult.data.allBooks}/>
        <Login show={page === 'login'} setToken={setToken}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        Welcome {me.data.me.username}!
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'} filter={filter} setFilter={setFilter} books={bookResult.data.allBooks}/>
      <NewBook show={page === 'add'} setFilter={setFilter}/>
      <Recommendations show={page === 'recommendations'} setFilter={setFilter} me={me} books={bookResult.data.allBooks}/>
    </div>
  )
}

export default App
