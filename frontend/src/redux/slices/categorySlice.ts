import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../actions/categoriesActions';

interface ICategoriesState{
    categories:ICategoryType[]
    loading:boolean
    error:string
}

interface ICategoryType{
    _id:string
    name:string
    block:boolean
}

const initialState:ICategoriesState={
    categories:[],
    loading:false,
    error:""
}

const CategoriesSlice=createSlice({
    name:"categories",
    initialState,
    reducers:{
        setCategories:(state,action:PayloadAction<ICategoryType[]>)=>{
            state.categories=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCategories.fulfilled,(state,{payload})=>{
            state.categories=payload
            state.loading=false
        })
        builder.addCase(getCategories.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getCategories.rejected,(state,{payload})=>{
            state.error=payload as string
            state.loading=false
        })
    }
})

export const {setCategories} = CategoriesSlice.actions
export const selectCategories = (state:{categories:ICategoriesState})=>state.categories

export default CategoriesSlice.reducer