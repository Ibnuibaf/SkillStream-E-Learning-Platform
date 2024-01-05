import { ObjectId } from "mongoose";

export interface IChat{
    user:string|ObjectId
    message:string
    image:string
}

export interface IPersonalChat{
    student:string|ObjectId
    instructor:string|ObjectId
    chats:IChat[]
    validity:Date
}