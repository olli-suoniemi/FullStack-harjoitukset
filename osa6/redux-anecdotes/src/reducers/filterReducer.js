import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      const content = action.payload
      return content
    }
  }
})
  
export const { createFilter } = filterSlice.actions
export default filterSlice.reducer
