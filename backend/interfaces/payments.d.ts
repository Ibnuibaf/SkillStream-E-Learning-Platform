import { ObjectId } from "mongoose";

export interface IPayments{
    user:ObjectId
    amount:number
    date:Date
    checked:boolean
}
