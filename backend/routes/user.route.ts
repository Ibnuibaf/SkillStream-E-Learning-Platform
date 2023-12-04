import express, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import UserUsecase from "../usecases/user.usecase";
import UserController from "../controllers/user.controller";

const Router = express.Router();
const userRepository = new UserRepository();
const userUsecase = new UserUsecase(userRepository);
const userController = new UserController(userUsecase);

Router.get("/find", (req: Request, res: Response) =>
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

export default Router;
