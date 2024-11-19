import { configureStore } from '@reduxjs/toolkit'
import verifyUserReducer from '../redux/content/verifyUser'
// import apiDataReducer from  '../redux/content/apiData'

export const store = configureStore({
  reducer: {
    verifyUser: verifyUserReducer
  },
})