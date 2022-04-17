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
export default notificationSlice.reducer
