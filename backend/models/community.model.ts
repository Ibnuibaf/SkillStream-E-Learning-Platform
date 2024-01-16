import mongoose from "mongoose";
import ICommunity from "../interfaces/community";

const CommunityShcema = new mongoose.Schema<ICommunity>({
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  chats: [
    {
      user: {
        type: String
      },
      message: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
});


const CommunityModel = mongoose.model("Community", CommunityShcema);

export default CommunityModel;
