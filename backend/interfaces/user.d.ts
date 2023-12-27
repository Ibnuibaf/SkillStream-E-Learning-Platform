import { ObjectId } from "mongoose";

interface ILearning {
  course: ObjectId;
  progress: ObjectId[];
}
interface IUser {
  id: string;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  role?: string;
  isBlock?: boolean;
  verification?:object;
  verified?:boolean
  learnings:ILearning[]
}

export default IUser;
