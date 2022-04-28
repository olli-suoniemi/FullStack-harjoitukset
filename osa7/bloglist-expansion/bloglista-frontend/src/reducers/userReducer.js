const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET-USER':
      return action.data.user
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET-USER',
    data: {
      user,
    },
  }
}

export default userReducer
