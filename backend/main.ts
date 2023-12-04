import { Request, Response } from "express";
import connectDB from "./configs/db";
import createServer from "./configs/server";
import userRoute from './routes/user.route'
const app=createServer()

app.get('/',(req:Request,res:Response)=>{
    res.send("Allset until now");
})

app.use('/api/user',userRoute)
// app.use('/api/courses')
// app.use('/api/order')

app.listen(3000,()=>{
    console.log("Server listening on http://localhost:3000/");
    connectDB()
})