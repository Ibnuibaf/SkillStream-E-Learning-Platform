import Payments from "../models/payment.model";

class PaymentRepository {
  async getPayments() {
    try {
      const payments = await Payments.find().populate("user", "name").sort({checked:1});
      return {
        success: true,
        message: "fetch all payments",
        payments,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
  
  async createPayment(userId: string, amount: number) {
    try {
      const payments = await Payments.create({
        user: userId,
        amount: amount,
        date: new Date(),
      });
      if (!payments) {
        return {
          success: false,
          message: "No payment request made",
        };
      }
      return {
        success: true,
        message: "Amount has been requested for withdrawal",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
  async proceedPayment(paymentId: string) {
    try {
      const payment = await Payments.findByIdAndUpdate(paymentId,{checked:true},{new:true});
      if (!payment) {
        return {
          success: false,
          message: "No payment request made",
        };
      }
      return {
        success: true,
        message: "Amount has been for withdrawal",
        payment
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
}
export default PaymentRepository;
