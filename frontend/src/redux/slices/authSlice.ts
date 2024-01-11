import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../actions/authActions";

interface AuthState {
  user: UserType | null;
  loading: boolean;
  error: string;
}
interface ILearning {
  course: string;
  progress: string[];
  certificate:boolean
}
interface IWallet {
  balance: string | number;
  transactions: {
    date: Date;
    amount: string | number;
    type: string;
    remark: string;
  }[];
}
interface UserType {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  isBlock: boolean;
  verified: boolean;
  verification: {
    "0": string;
    "1": string;
    "2": string;
  };
  learnings:ILearning[]
  teachings:string[]
  wallet:IWallet
  wishlist:string[]
}

const initialState: AuthState = {
  // user: {
  //     name:"ibrahim",
  //     id:"124346",
  //     email:"ibnu@gmail.com",
  //     avatar:"https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png",
  //     role:"Developer"
  // }
  user: null,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    cleanUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export const { setUser, cleanUser } = authSlice.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth;

export default authSlice.reducer;
