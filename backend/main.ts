import { Request, Response } from "express";
import connectDB from "./configs/db";
import createServer from "./configs/server";
import userRoute from './routes/user.route'
import categoryRoute from './routes/category.route'
import courseRoute from './routes/course.route.'
import orderRoute from './routes/order.route'
const app=createServer()

app.get('/',(req:Request,res:Response)=>{
    res.send("Allset until now");
})

app.use('/api/user',userRoute)
app.use('/api/category',categoryRoute)
app.use('/api/course',courseRoute)
app.use('/api/order',orderRoute)

app.listen(3000,()=>{
    console.log("Server listening on http://localhost:3000/");
    connectDB()
})