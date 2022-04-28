import userService from './../services/users'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Button,
  TextField,
  Typography,
  Grid,
  styled,
  ListItemIcon
} from '@mui/material';

const UserInfo = () => {
  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService.getAll().then((response) => {
      const user = response.filter((i) => i.id === id)
      setUser(user[0])
      setBlogs(user[0].blogs)
    })
  }, [])

  if (!blogs || !user) {
    return null
  }

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h4">{user.name}</Typography>
      <Typography> Blogs that this user has added: </Typography>
      <Divider />
      <List>
        {blogs.map((i) => (
          <ListItem key={i.id}>
            <ListItemText primary={`${i.title}`}/>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserInfo
