import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import UserRepository from "../repositories/user.repository";
import { HttpStatus } from "../enums/HttpStatus.enum";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_SECRET as string, {
  apiVersion: "2023-10-16",
});

class StripePayments {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async checkoutSession(req: Request, res: Response) {
    const { course, userId } = req.body;
    const isExist = await this.userRepository.isCourseInLearnings(
      userId,
      course._id
    );
    if (isExist) {
      res
        .status(HttpStatus.ServerError)
        .send({ success: false, message: "Course already purchased" });
    } else {
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
        success_url: `https://skillstream.chibrahim.online/purchase?success=true&userId=${userId}&courseId=${
          course._id
        }&price=${Math.floor(
          course.price - (course.offer * course.price) / 100
        )}`,
        cancel_url: `https://skillstream.chibrahim.online/`,
      });

      res.send({ url: session.url });
    }
  }
  async subscribeSession(req: Request, res: Response) {
    const { instructor, student } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Instructor Subscription"
            },
            unit_amount: 130 * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://skillstream.chibrahim.online/subscribe?success=true&student=${student}&instructor=${instructor}`,
      cancel_url: `https://skillstream.chibrahim.online/`,
    });

    res.send({ url: session.url });
  }
  
  async paymentIntent(req: Request, res: Response) {
    const { instructor, user } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: 130,
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: payment.client_secret,
    });
  }
}

export default StripePayments;
