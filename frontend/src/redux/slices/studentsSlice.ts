import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface StudentsState{
    data:UserType[]
}


interface UserType{
    _id:string
    name:string
    email:string
    avatar:string
    role:string
    isBlock:boolean
    verified:boolean
}

const initialState: StudentsState={
    data:[]
}



const studentsSlice= createSlice({
    name:"students",
    initialState,
    reducers:{
        setStudents:(state , action: PayloadAction<UserType[]> )=>{
            state.data=action.payload
        }
    }
})

export const {setStudents} = studentsSlice.actions
export const selectStudents = (state:{students:StudentsState})=>state.students.data

export default studentsSlice.reducer