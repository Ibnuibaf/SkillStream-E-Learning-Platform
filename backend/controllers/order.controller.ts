import { Request, Response } from "express";
import OrderUsecase from "../usecases/order.usecase";

class OrderController {
  private orderUsecase: OrderUsecase;
  constructor(orderUsecase: OrderUsecase) {
    this.orderUsecase = orderUsecase;
  }

  async getOrders(req: Request, res: Response) {
    try {
      const response = await this.orderUsecase.getOrders();
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
    
  }
  async createOrder(req: Request, res: Response) {
    try {
      const response = await this.orderUsecase.createOrder(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getMonthlySales(req: Request, res: Response) {
    try {
      const response = await this.orderUsecase.getMonthlySales();
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getMonthlyInstructorSales(req: Request, res: Response) {
    try {
      const response = await this.orderUsecase.getMonthlyInstructorSales(req.headers["authorization"] as string);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  
}

export default OrderController;
