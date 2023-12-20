import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";

export const getCourses = createAsyncThunk(
  "courses/getcourses",
  async (search: string, { rejectWithValue }) => {
    try {
        
      const response = await api.get(
        search
          ? `/course?search=${search}`
          : `/course`
      );
      if (!response.data.courses) {
        toast(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.courses;
    } catch (error: any) {
      console.error("Error fetching user:", error);
      toast(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
