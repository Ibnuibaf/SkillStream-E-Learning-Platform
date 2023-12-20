import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_SECRET as string, {
  apiVersion: "2023-10-16",
});

class StripePayments {
  async checkoutSession(req: Request, res: Response) {
    const { course, userId } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: course.title,
              images: [course.cover],
            },
            unit_amount: Math.round(
              course.price * 100 - (course.offer * course.price) / 100
            ),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/purchase?success=true&userId=${userId}&courseId=${course._id}&price=${course.price}`,
      cancel_url: `http://localhost:5173/purchase?canceled=true`,
    });

    res.send({ url: session.url });
  }
}

export default StripePayments;
