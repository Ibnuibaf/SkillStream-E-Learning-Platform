import mongoose from "mongoose";
import { IPersonalChat } from "../interfaces/personalchat";


const PersonalchatShcema = new mongoose.Schema<IPersonalChat>({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chats: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  validity:{
    type:Date
  }
});

const PersonalchatModel = mongoose.model("Personalchat", PersonalchatShcema);

export default PersonalchatModel;
