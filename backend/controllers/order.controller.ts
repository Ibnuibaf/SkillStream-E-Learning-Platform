import { Request, Response } from "express";
import OrderUsecase from "../usecases/order.usecase";

class OrderController{
    private orderUsecase:OrderUsecase
    constructor (orderUsecase:OrderUsecase){
        this.orderUsecase=orderUsecase
    }

    async createOrder(req:Request,res:Response){
        try {
            const response=await this.orderUsecase.createOrder(req.body)
            res.status(response.status).send(response.data)
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "server error",
              });
        }
    }
}

export default OrderController