import mongoose from "mongoose";
import ICourse from "../interfaces/course";

const CourseSchema = new mongoose.Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  language: {
    type: String,
    default: "English",
  },
  level: {
    type: String,
    required: true,
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
    required:true
  },
  enrollers:[{
    type:mongoose.Types.ObjectId,
    ref:"users",
  }],
  price:{
    type:Number,
    required:true
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