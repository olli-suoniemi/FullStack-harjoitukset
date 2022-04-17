import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)

    let anecdotes = useSelector(state => 
        state.anecdotes.slice().sort((a, b) =>
             (a.votes > b.votes) ? -1 : 1))
    
    anecdotes = filter ?
      anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      : anecdotes
    
    const vote = (id) => {
        dispatch(createVote(id))
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(createNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => {
          dispatch(createNotification(null))
        }, 5000)
    }

  return (
      <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
      </div>
  )
}

export default AnecdoteList