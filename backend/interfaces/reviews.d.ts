import { ObjectId } from "mongoose"

export default interface IReviews{
    user:string|ObjectId
    rating:number,
    feedback:string
}
