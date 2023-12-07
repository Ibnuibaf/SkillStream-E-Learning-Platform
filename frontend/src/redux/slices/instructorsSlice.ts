import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface InstructorsState{
    data:UserType[]
}


interface UserType{
    _id:string
    name:string
    email:string
    avatar:string
    role:string
    isBlock:boolean
    verification:object
}

const initialState: InstructorsState={
    data:[]
}



const InstructorsSlice= createSlice({
    name:"instructors",
    initialState,
    reducers:{
        setInstructors:(state , action: PayloadAction<UserType[]> )=>{
            state.data=action.payload
        }
    }
})

export const {setInstructors} = InstructorsSlice.actions
export const selectInstructors = (state:{instructors:InstructorsState})=>state.instructors.data

export default InstructorsSlice.reducer