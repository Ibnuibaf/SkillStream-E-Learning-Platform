import express, { NextFunction, Request, Response } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import UserRepository from "../repositories/user.repository";
import PaymentRepository from "../repositories/payment.repository";
import PaymentUsecase from "../usecases/payment.usecase";
import PaymentController from "../controllers/payment.controller";

const Router = express.Router();

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const paymentRepository = new PaymentRepository();
const paymentUsecase = new PaymentUsecase(paymentRepository);
const paymentController = new PaymentController(paymentUsecase);


Router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => paymentController.getPayments(req, res)
);
Router.patch(
  "/proceed",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => paymentController.proceedPayment(req, res)
);

Router.post(
  "/request",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => paymentController.createPayment(req, res)
);

export default Router;
