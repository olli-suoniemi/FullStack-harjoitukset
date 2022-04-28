import React from 'react'
import { Button } from '@mui/material'

const LogOutForm = ({ handleLogout }) => {

  return (
    <form onSubmit={handleLogout}>
      <div>
        <Button color="error" type='submit'>
          logout
        </Button>
      </div>
    </form>
  )
}

export default LogOutForm
