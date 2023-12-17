import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("auth/getuser", async (_,{rejectWithValue}) => {
  try {
      const response = await api.get("/user/find");
      if (!response.data.user) {
        toast(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.user
    
  } catch (error: any) {
    console.error("Error fetching user:", error);
    localStorage.removeItem("SkillStreamToken");

    toast(error.response.data.message);
    return rejectWithValue(error.response.data.message)
  }
});
