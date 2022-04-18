import { createSlice } from '@reduxjs/toolkit'

const initialState = null

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

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, time*1000)
  }
}
export default notificationSlice.reducer
