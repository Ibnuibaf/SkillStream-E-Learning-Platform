import { ObjectId } from "mongoose"

interface IOrder{
    userId:string|ObjectId
    courseId:string|ObjectId
    price:number
    date:Date
}


export default IOrder