import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface AuthState{
    user:UserType | null
}

interface UserType{
    id:string
    name:string
    email:string
    avatar:string
    role:string
}

const initialState: AuthState={
    // user: {
    //     name:"ibrahim",
    //     id:"124346",
    //     email:"ibnu@gmail.com",
    //     avatar:"https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png",
    //     role:"Developer"
    // }
    user:null
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state , action: PayloadAction<UserType> )=>{
            state.user=action.payload
        },
        cleanUser:(state)=>{
            state.user=null
        }
    }
})

export const {setUser,cleanUser} = authSlice.actions
export const selectUser = (state:{auth:AuthState})=>state.auth.user 

export default authSlice.reducer