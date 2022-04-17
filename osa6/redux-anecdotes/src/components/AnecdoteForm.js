import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification(`you added new blog called '${content}'`))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
        <h2>create new</h2>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
    </form>
  )
}

export default NewAnecdote