import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import studentsReducer from './slices/studentsSlice'

const store= configureStore({
    reducer:{
        auth: authReducer,
        students: studentsReducer
    }
})

export default store