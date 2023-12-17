import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { getStudents } from '../actions/studentsActions'

interface StudentsState{
    data:UserType[]
    loading:boolean
    error:string
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
    data:[],
    loading:false,
    error:""
}



const studentsSlice= createSlice({
    name:"students",
    initialState,
    reducers:{
        setStudents:(state , action: PayloadAction<UserType[]> )=>{
            state.data=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getStudents.fulfilled,(state,{payload})=>{
            state.loading=false
            state.data=payload
        })
        builder.addCase(getStudents.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getStudents.rejected,(state,{payload})=>{
            state.loading=false
            state.error=payload as string
        })
    }
})

export const {setStudents} = studentsSlice.actions
export const selectStudents = (state:{students:StudentsState})=>state.students.data

export default studentsSlice.reducer