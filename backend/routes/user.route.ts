import express, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import UserUsecase from "../usecases/user.usecase";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import StripePayments from "../utils/stripe.payment";
import OtpRepository from "../repositories/otp.repository";
// import passport from "passport";

const Router = express.Router();
const userRepository = new UserRepository();
const otpRepository= new OtpRepository()
const authMiddleware = new AuthMiddleware(userRepository);
const userUsecase = new UserUsecase(userRepository,otpRepository);
const userController = new UserController(userUsecase);
const stripePayments = new StripePayments(userRepository);


Router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.adminCheck(req, res, next),
  (req: Request, res: Response) => userController.getUsers(req, res)
);
Router.get(
  "/learnings",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.getUserLearnings(req, res)
);
Router.get(
  "/instructors",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.getInstructors(req, res)
);
Router.get(
  "/students",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.getStudents(req, res)
);
Router.patch(
  "/learnings/progress",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) =>
    userController.updateLearningsProgress(req, res)
);
Router.patch(
  "/status",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.adminCheck(req, res, next),
  (req: Request, res: Response) => userController.updateStatus(req, res)
);
Router.patch(
  "/instructor/verify",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.adminCheck(req, res, next),
  (req: Request, res: Response) => userController.verifyInstructor(req, res)
);
Router.get(
  "/find",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.findUser(req, res)
);
Router.post("/register", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

Router.post("/otp", (req: Request, res: Response) =>
  userController.sendOTP(req, res)
);
Router.post("/otp/verify", (req: Request, res: Response) =>
  userController.verifyOTP(req, res)
);
Router.post("/login", (req: Request, res: Response) =>
  userController.loginUser(req, res)
);
Router.post("/recover", (req: Request, res: Response) =>
  userController.changePassword(req, res)
);
Router.post(
  "/authorize",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.updateRole(req, res)
);
Router.post(
  "/subscribe-session",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => stripePayments.subscribeSession(req, res)
);
Router.get(
  "/wishlist",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.getWishlist(req, res)
);
Router.patch(
  "/wishlist/add",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.addToWishlist(req, res)
);
Router.patch(
  "/wishlist/remove",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.removeFromWishlist(req, res)
);
Router.patch(
  "/update",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.updateUserDetails(req, res)
);
Router.patch(
  "/wallet/withdraw",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.userWalletWithdraw(req, res)
);
Router.patch(
  "/learning/certify",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => userController.learningCertify(req, res)
);
Router.patch(
  "/payment",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => stripePayments.paymentIntent(req, res)
);

export default Router;
