import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";
import axios from "axios";

export const getUser = createAsyncThunk(
  "auth/getuser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/find");
      if (!response.data.user) {
        toast(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error?.response?.data?.message);
        console.error("Error fetching user:", error);
        localStorage.removeItem("SkillStreamToken");

        return rejectWithValue(error?.response?.data?.message );
      } else {
        toast("An unexpected error occurred");
        return
      }
    }
  }
);
