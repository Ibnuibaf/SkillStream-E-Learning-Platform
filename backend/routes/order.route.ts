import express, { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/user.repository";
import AuthMiddleware from "../middlewares/auth.middleware";
import StripePayments from "../utils/stripe.payment";
import CourseRepository from "../repositories/course.repository";
import OrderRepository from "../repositories/order.repository";
import OrderUsecase from "../usecases/order.usecase";
import OrderController from "../controllers/order.controller";

const userRepository = new UserRepository();
const stripePayments = new StripePayments(userRepository);
const courseRepository = new CourseRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const orderRepository = new OrderRepository();
const orderUsecase = new OrderUsecase(
  orderRepository,
  userRepository,
  courseRepository
);

const orderController = new OrderController(orderUsecase);

const Router = express.Router();

Router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authUser(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.adminCheck(req, res, next);
  },
  (req: Request, res: Response) => {
    orderController.getOrders(req, res);
  }
);
Router.post(
  "/checkout-session",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authUser(req, res, next);
  },
  (req: Request, res: Response) => {
    stripePayments.checkoutSession(req, res);
  }
);

Router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authUser(req, res, next);
  },
  (req: Request, res: Response) => {
    orderController.createOrder(req, res);
  }
);
Router.get(
  "/monthly-enrollment",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authUser(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.adminCheck(req, res, next);
  },
  (req: Request, res: Response) => {
    orderController.getMonthlySales(req, res);
  }
);
Router.get(
  "/instructor/monthly-enrollment",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authUser(req, res, next);
  },
  (req: Request, res: Response) => {
    orderController.getMonthlyInstructorSales(req, res);
  }
);

export default Router;
