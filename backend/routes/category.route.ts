import express, { NextFunction, Request, Response } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";
import UserRepository from "../repositories/user.repository";
import CategoryRepository from "../repositories/category.repository";
import CategoryUsecase from "../usecases/category.usecase";
import CategoryController from "../controllers/category.controller";

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const categoryRepository = new CategoryRepository();
const categoryUsecase = new CategoryUsecase(categoryRepository);
const categoryController = new CategoryController(categoryUsecase);


const Router = express.Router();

Router.get("/", (req: Request, res: Response) =>
  categoryController.getCategories(req, res)
);
Router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.adminCheck(req, res, next),
  (req: Request, res: Response) => categoryController.createCategory(req, res)
);
Router.patch(
  "/update",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.adminCheck(req, res, next),
  (req: Request, res: Response) => categoryController.updateCategory(req, res)
);

export default Router;
