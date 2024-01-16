import mongoose from "mongoose";
import { IPayments } from "../interfaces/payments";

const PaymentSchema = new mongoose.Schema<IPayments>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const PaymentModel=mongoose.model("Payment",PaymentSchema)


export default PaymentModel