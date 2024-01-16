import mongoose from 'mongoose'
import ICategory from '../interfaces/category'

const categoryShema=new mongoose.Schema<ICategory>({
    name:{
        type:String,
        required:true
    },
    block:{
        type:Boolean,
        default:false
    }
})


const categoryModel= mongoose.model("Category",categoryShema)

export default categoryModel