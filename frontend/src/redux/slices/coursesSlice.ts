import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCourses } from '../actions/coursesActions';

interface ICoursesState{
    courses:ICoursesType[]
    loading:boolean
    error:string
}

interface ILessonType{
    title:string
    content:string
    duration:string
}
interface ICouponType{
    code:string
    value:number
    from:Date
    to:Date
}

interface ICoursesType{
    _id:string
    title:string
    description:string
    language:string
    level:string
    category:string
    cover:string
    lessons:ILessonType[]
    announcements:string[]
    coupons:ICouponType[]
    price:number
    offer:number
    isApproved:boolean
    isBlock:boolean
}

const initialState:ICoursesState={
    courses:[],
    loading:false,
    error:""
}

const coursesSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{
        setcourses:(state,action:PayloadAction<ICoursesType[]>)=>{
            state.courses=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCourses.fulfilled,(state,{payload})=>{
            state.courses=payload
            state.loading=false
        })
        builder.addCase(getCourses.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getCourses.rejected,(state,{payload})=>{
            state.error=payload as string
            state.loading=false
        })
    }
})

export const {setcourses} = coursesSlice.actions
export const selectcourses = (state:{courses:ICoursesState})=>state.courses

export default coursesSlice.reducer