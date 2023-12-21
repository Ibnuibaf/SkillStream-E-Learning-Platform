import mongoose from "mongoose";
import ICourse from "../interfaces/course";

const CourseSchema = new mongoose.Schema<ICourse>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "categories",
  },
  language: {
    type: String,
    default: "English",
  },
  level: {
    type: String,
  },
  announcements: { type: [String], default: [] },
  cover:{
    type:String,
  },
  offer:{
    type:Number,
    default:0
  },
  instructor:{
    type:mongoose.Types.ObjectId,
    ref:"users",
  },
  enrollers:[{
    type:mongoose.Types.ObjectId,
    ref:"users",
  }],
  price:{
    type:Number,
  },
  isApproved:{
    type:Boolean,
    default:false
  },
  isBlock:{
    type:Boolean,
    default:false
  }
});

const CourseModel=mongoose.model("Course",CourseSchema)

export default CourseModel