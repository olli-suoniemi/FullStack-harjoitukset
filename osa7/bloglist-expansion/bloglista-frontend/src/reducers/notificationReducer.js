const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        message: action.data.message,
        classification: action.data.classification,
      }
    default:
      return state
  }
}

export const notify = (message, classification) => {
  return {
    type: 'NOTIFY',
    data: {
      message,
      classification,
    },
  }
}

export default notificationReducer
