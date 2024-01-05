import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCourses } from "../actions/coursesActions";

interface ICoursesState {
  courses: ICoursesType[];
  loading: boolean;
  error: string;
}
interface IMCQ{
  question:string
  options:string[]
  answer:number
}
interface IReviews {
  user: { name: string; _id: string } ;
  rating: number;
  feedback: string;
}
interface ILessonType {
  _id?: string;
  title: string;
  content: string;
  duration: number | string;
}
interface ICouponType {
  code: string;
  value: number;
  from: Date;
  to: Date;
}

interface ICoursesType {
  _id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: { name: string; _id: string } | string;
  preview?: string;
  cover: string;
  lessons: ILessonType[];
  mcq:IMCQ[]
  announcements: string[];
  coupons: ICouponType[];
  reviews?: IReviews[];
  price: number;
  offer: number;
  instructor: { name: string; _id: string } | string;
  isApproved: boolean;
  isBlock: boolean;
  enrollers: string[];
}

const initialState: ICoursesState = {
  courses: [],
  loading: false,
  error: "",
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setcourses: (state, action: PayloadAction<ICoursesType[]>) => {
      state.courses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourses.fulfilled, (state, { payload }) => {
      state.courses = payload;
      state.loading = false;
    });
    builder.addCase(getCourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourses.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.loading = false;
    });
  },
});

export const { setcourses } = coursesSlice.actions;
export const selectcourses = (state: { courses: ICoursesState }) =>
  state.courses;

export default coursesSlice.reducer;
