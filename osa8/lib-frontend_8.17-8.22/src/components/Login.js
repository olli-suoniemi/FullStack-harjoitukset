import { useState, useEffect } from 'react'

import { useMutation } from '@apollo/client'

import { LOGIN } from './../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log((error.graphQLErrors[0].message))
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, props])

  const loginUser = async (event) => {
    event.preventDefault()

    login({variables: { username, password }})
    setPassword('')
    setUsername('')
  }

  if (!props.show) {
    return null
  }

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          username
          <input type={'text'} 
            value={username} 
            onChange={({target}) => setUsername(target.value)}>
          </input>
        </div>
        <div>
          password
          <input type={'password'}
            value={password}
            onChange={({target}) => setPassword(target.value)}>
          </input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login