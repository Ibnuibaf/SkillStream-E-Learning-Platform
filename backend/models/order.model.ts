import mongoose from 'mongoose'
import IOrder from '../interfaces/order'

const orderSchema=new mongoose.Schema<IOrder>({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Course",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
    }
})

const orderModel= mongoose.model("Order",orderSchema)


export default orderModel