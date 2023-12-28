import express, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import AuthMiddleware from "../middlewares/auth.middleware";
import CommunityRepository from "../repositories/community.repository";
import CommunityUsecase from "../usecases/community.usecase";
import CommunityController from "../controllers/community.controller";

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const communityRepository = new CommunityRepository();
const communityUsecase = new CommunityUsecase(communityRepository);
const communityController = new CommunityController(communityUsecase);

const Router = express.Router();

Router.get(
  "/find",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => communityController.findCommunity(req, res)
);

export default Router;
