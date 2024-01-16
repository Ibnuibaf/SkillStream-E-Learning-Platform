/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useLoadCurrentUserQuery } from "@/redux/features/api/apiSlice";
// import { useCreateOrderMutation } from "@/redux/features/payment/paymentApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import  { useEffect, useState } from "react";


// type Props = {};
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsloading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsloading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsloading(false);
    }
  };

  useEffect(() => {
    
    //eslint-disable-next-line
  }, []);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <LinkAuthenticationElement id="link-authentication-element" />
      </div>
      <div className="mb-6">
        <PaymentElement id="payment-element" />
      </div>
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-gray-900 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? "Paying..." : `Pay ₹${130}`}
        </span>
      </button>
      {message && (
        <div
          id="payment-message"
          className="mt-4 text-center text-sm text-red-500"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;