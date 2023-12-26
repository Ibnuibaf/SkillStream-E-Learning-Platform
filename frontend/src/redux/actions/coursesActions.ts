import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";
import axios from "axios";

interface GetCoursesArgs {
  search: string;
  isInstructor: boolean;
}
export const getCourses = createAsyncThunk(
  "courses/getcourses",
  async ({ search, isInstructor }: GetCoursesArgs, { rejectWithValue }) => {
    try {
      const response = await api.get(
        search
          ? `/course/${isInstructor ? "instructor" : ""}?search=${search}`
          : `/course/${isInstructor ? "instructor" : ""}`
      );
      if (!response.data.courses) {
        toast(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.courses;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching user:", error);
        toast(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  }
);
