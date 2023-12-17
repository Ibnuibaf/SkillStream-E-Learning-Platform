import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import studentsReducer from './slices/studentsSlice'
import instructorsReducer from './slices/instructorsSlice'

const store= configureStore({
    reducer:{
        auth: authReducer,
        students: studentsReducer,
        instructors: instructorsReducer
    }
})
export type AppDispatch=typeof store.dispatch
export default store