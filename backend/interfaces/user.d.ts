import { ObjectId } from "mongoose";

interface ILearning {
  course: ObjectId;
  progress: ObjectId[];
  certificate:boolean
}
interface IWallet {
  balance: number;
  transactions: {
    date: Date;
    amount: string | number;
    type: string;
    remark: string;
  }[];
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
  verification?: object;
  verified?: boolean;
  learnings: ILearning[];
  teachings: ObjectId[] | string[];
  wallet:IWallet
}

export default IUser;
