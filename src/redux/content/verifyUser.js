import { createSlice } from '@reduxjs/toolkit'

export const verifyUser = createSlice({
  name: 'verifyUser',
  initialState:false ,
  reducers: {
    setTrue: () => true,
    setFalse : () => false
  },
})

// Action creators are generated for each case reducer function
export const { setTrue, setFalse } = verifyUser.actions

export default verifyUser.reducer