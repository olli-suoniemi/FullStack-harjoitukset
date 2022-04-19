import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  let style = {}
  
  if (notification) {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  } else {
    style = {
      visibility: 'hidden'
    }
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(
    mapStateToProps,
    null
)(Notification)

export default ConnectedNotification