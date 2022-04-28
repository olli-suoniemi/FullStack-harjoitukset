import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
      <List>
        <h2>Welcome to blog app!</h2>
        <ListItem disablePadding>
          <ListItemText primary="List of already added blogs:" />
        </ListItem>
        <Divider />
        <List>
          {blogs.map((blog) => (
            <ListItem disablePadding key={blog.id}>
              <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                <ListItemText primary={`${blog.title}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </List>
  )
}

export default Blogs
