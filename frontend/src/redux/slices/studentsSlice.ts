import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStudents } from "../actions/studentsActions";

interface StudentsState {
  data: UserType[];
  loading: boolean;
  error: string;
}

interface ILearning {
  course: string;
  progress: string[];
  certificate: boolean;
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
  learnings: ILearning[];
  teachings: string[];
  wallet: IWallet;
}

const initialState: StudentsState = {
  data: [],
  loading: false,
  error: "",
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<UserType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudents.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudents.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export const { setStudents } = studentsSlice.actions;
export const selectStudents = (state: { students: StudentsState }) =>
  state.students.data;

export default studentsSlice.reducer;
