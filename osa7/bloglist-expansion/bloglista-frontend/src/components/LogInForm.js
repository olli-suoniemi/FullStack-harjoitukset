import React from 'react'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addUser = async (event) => {
    event.preventDefault()
    loginUser(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={addUser}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
