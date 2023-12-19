import ICoupon from "./coupon"
import ILesson from "./lesson"

interface ICourse{
    title:string
    description:string
    language:string
    level:string
    category:string
    cover:string
    lessons:ILesson[]
    announcements:[string]
    coupons:ICoupon[]
    price:number
    offer:number
}

export default ICourse