import { ObjectId } from "mongoose"
import ICoupon from "./coupon"
import ILesson from "./lesson"

interface ICourse{
    _id?:string|ObjectId
    title:string
    description:string
    language:string
    level:string
    category:string|ObjectId
    cover:string
    lessons:ILesson[]
    announcements:string[]
    coupons:ICoupon[]
    price:number
    offer:number
    isApproved:boolean
    isBlock:boolean
}

export default ICourse