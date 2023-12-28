import { ObjectId } from "mongoose"

export interface IChat{
    user:string
    message:string
    image:string
}

interface ICommunity{
    course:string|ObjectId
    chats:IChat[]
}

export default ICommunity