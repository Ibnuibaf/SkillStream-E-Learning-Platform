import jwt from "jsonwebtoken";
import MyJWTPayLoad from "../interfaces/jwt";
import PaymentRepository from "../repositories/payment.repository";
import { HttpStatus } from "../enums/HttpStatus.enum";

class PaymentUsecase {
  private paymentRepository: PaymentRepository;
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }
  async getPayments() {
    try {
      const response = await this.paymentRepository.getPayments();
      // console.log(response);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          payments: response.payments,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async createPayment(details: any, token: string) {
    try {
      const user = this.decodeToken(token);
      let { amount } = details;
      // console.log(user,details);
      const response = await this.paymentRepository.createPayment(
        user.id,
        amount
      );
      // console.log(response);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async proceedPayment(details: any) {
    try {
      let { id } = details;
      // console.log(user,details);
      const response = await this.paymentRepository.proceedPayment(id);
      if (!response.payment) {
        return {
          status: response.success
            ? HttpStatus.Success
            : HttpStatus.ServerError,
          data: {
            success: response.success,
            message: response.message,
          },
        };
      }
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          payment: response.payment,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
}

export default PaymentUsecase;
