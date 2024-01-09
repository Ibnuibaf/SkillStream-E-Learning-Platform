import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInstructors } from "../actions/instructorsActions";

interface InstructorsState {
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

const initialState: InstructorsState = {
  data: [],
  loading: false,
  error: "",
};

const InstructorsSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    setInstructors: (state, action: PayloadAction<UserType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInstructors.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(getInstructors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInstructors.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  },
});

export const { setInstructors } = InstructorsSlice.actions;
export const selectInstructors = (state: { instructors: InstructorsState }) =>
  state.instructors;

export default InstructorsSlice.reducer;
