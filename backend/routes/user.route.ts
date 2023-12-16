import express, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import UserUsecase from "../usecases/user.usecase";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const Router = express.Router();
const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository)
const userUsecase = new UserUsecase(userRepository);
const userController = new UserController(userUsecase);

Router.get("/",(req:Request,res:Response,next:NextFunction)=>authMiddleware.authUser(req,res,next), (req: Request, res: Response) =>
  userController.getUsers(req, res)
);
Router.patch("/status",(req:Request,res:Response,next:NextFunction)=>authMiddleware.authUser(req,res,next), (req: Request, res: Response) =>
  userController.updateStatus(req, res)
);
Router.patch("/instructor/verify",(req:Request,res:Response,next:NextFunction)=>authMiddleware.authUser(req,res,next), (req: Request, res: Response) =>
  userController.verifyInstructor(req, res)
);
Router.get("/find",(req:Request,res:Response,next:NextFunction)=>authMiddleware.authUser(req,res,next), (req: Request, res: Response) =>
  userController.findUser(req, res)
);
Router.post("/register", (req: Request, res: Response) =>
  userController.createUser(req, res)
);
Router.post("/otp", (req: Request, res: Response) =>
  userController.sendOTP(req, res)
);
Router.post("/login", (req: Request, res: Response) =>
  userController.loginUser(req, res)
);
Router.post("/recover", (req: Request, res: Response) =>
  userController.changePassword(req, res)
);
Router.post("/authorize",(req:Request,res:Response,next:NextFunction)=>authMiddleware.authUser(req,res,next), (req: Request, res: Response) =>
  userController.updateRole(req, res)
);

export default Router;
