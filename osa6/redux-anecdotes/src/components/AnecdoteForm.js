import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you added new blog called '${content}'`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
        <h2>create new</h2>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
    </form>
  )
}


const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const ConnectedNewAnecdote = connect(
    null,
    mapDispatchToProps
)(NewAnecdote)

export default ConnectedNewAnecdote