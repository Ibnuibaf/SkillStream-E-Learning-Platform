import { Request, Response } from "express";
import PaymentUsecase from "../usecases/payment.usecase";

class PaymentController {
  private paymentUsecase: PaymentUsecase;
  constructor(paymentUsecase: PaymentUsecase) {
    this.paymentUsecase = paymentUsecase;
  }
  async getPayments(req: Request, res: Response) {
    try {
      const response = await this.paymentUsecase.getPayments();
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  
  async createPayment(req: Request, res: Response) {
    try {
      const response = await this.paymentUsecase.createPayment(
        req.body,
        req.headers["authorization"] as string
      );
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async proceedPayment(req: Request, res: Response) {
    try {
      const response = await this.paymentUsecase.proceedPayment(
        req.body
      );
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}
export default PaymentController
