import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";
import { toast } from "react-toastify";

export const getCategories = createAsyncThunk(
  "categories/getcategories",
  async (search: string, { rejectWithValue }) => {
    try {
        console.log("Iam in Redux Thunk");
        
      const response = await api.get(
        search
          ? `/category?search=${search}`
          : `/category`
      );
      if (!response.data.categories) {
        toast(response.data.message);
        return rejectWithValue(response.data.message);
      }
      return response.data.categories;
    } catch (error: any) {
      console.error("Error fetching user:", error);
      toast(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
