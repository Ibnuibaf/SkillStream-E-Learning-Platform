/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";

export const getInstructors = createAsyncThunk(
  "instructors/getinstructors",
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        search
          ? `/user?role=instructor&search=${search}`
          : `/user?role=instructor`
      );
      if (!response.data.users) {
        toast(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.users;
    } catch (error: any) {
      console.error("Error fetching user:", error);
      toast(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
