import { Link } from 'react-router-dom'
import { TableCell, TableRow } from '@mui/material'

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        {' '}
        <Link to={`/users/${user.id}`}> {user.username} </Link>{' '}
      </TableCell>
      <TableCell align="right"> {user.blogs.length} </TableCell>
    </TableRow>
  )
}

export default User
