import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  let severity = 'success'

  if (notification.classification === 'alert') {
    severity = 'error'
  }

  return (
    <div>
      {(notification.message &&
        <Alert severity={severity}>
          {notification.message}
        </Alert>
      )}
    </div>
  )
}

export default Notification
