import { ObjectId } from "mongoose"

interface IOrder{
    _id:string|ObjectId
    userId:string|ObjectId
    courseId:string|ObjectId
    price:number
}

export default IOrder