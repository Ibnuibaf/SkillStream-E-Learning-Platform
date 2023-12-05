import mongoose from "mongoose";
import IUser from "../interfaces/user";

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png",
  },
  role: {
    type: String,
    default: "student",
  },
  verification:{
    "0":String,
    "1":String,
    "2":String
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
