import userService from './../services/users'
import User from './User'
import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Added blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </TableHead>
      </Table>
    </TableContainer>
  )
}

export default Users
