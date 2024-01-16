import { ObjectId } from "mongoose"
import ICoupon from "./coupon"
import ILesson from "./lesson"
import IReviews from "./reviews"

interface IMCQ{
    question:string
    options:string[]
    answer:number
}

interface ICourse{
    _id?:string|ObjectId
    title:string
    description:string
    language:string
    level:string
    category:string|ObjectId
    cover:string
    preview:string
    lessons:ILesson[]
    announcements:string[]
    mcq:IMCQ[]
    coupons:ICoupon[]
    reviews:IReviews[]
    instructor:string|ObjectId
    enrollers:ObjectId[]
    price:number
    offer:number
    isApproved:boolean
    isBlock:boolean
}

export default ICourse