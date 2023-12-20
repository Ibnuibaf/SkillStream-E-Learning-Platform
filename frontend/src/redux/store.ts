import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import studentsReducer from './slices/studentsSlice'
import instructorsReducer from './slices/instructorsSlice'
import catogoriesReducer from './slices/categorySlice'
import coursesReducer from './slices/coursesSlice'

const store= configureStore({
    reducer:{
        auth: authReducer,
        students: studentsReducer,
        instructors: instructorsReducer,
        categories: catogoriesReducer,
        courses: coursesReducer,
    }
})
export type AppDispatch=typeof store.dispatch
export default store