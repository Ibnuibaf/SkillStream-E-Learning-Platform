import express, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import AuthMiddleware from "../middlewares/auth.middleware";
import PersonalchatRepository from "../repositories/personalchat.repository";
import PersonalchatUsecase from "../usecases/personalchat.usecase";
import PersonalchatController from "../controllers/personalchat.controller";

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const personalchatRepository = new PersonalchatRepository();
const personalchatUsecase = new PersonalchatUsecase(personalchatRepository);
const personalchatController = new PersonalchatController(personalchatUsecase);

const Router = express.Router();

Router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) =>
    personalchatController.findPersonals(req, res)
);
Router.get(
  "/find",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) =>
    personalchatController.findPersonalchat(req, res)
);
Router.get(
  "/instructor",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) =>
    personalchatController.findInstructorChats(req, res)
);
Router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) =>
    personalchatController.createPersonalChat(req, res)
);


export default Router;
