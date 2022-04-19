import { createSlice } from '@reduxjs/toolkit'

const initialState = null

let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      return content
    }
  }
})
  
export const { createNotification } = notificationSlice.actions

export const setNotification = (content, delay) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  return dispatch => {
    dispatch(createNotification(content))
    timeoutID = setTimeout(() => {
      dispatch(createNotification(null))
    }, delay*1000)
  }
}
export default notificationSlice.reducer
