import express, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import AuthMiddleware from "../middlewares/auth.middleware";
import CourseRepository from "../repositories/course.repository";
import CourseUsecase from "../usecases/course.usecase";
import CourseController from "../controllers/course.controller";
const Router = express.Router();

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const courseRepository = new CourseRepository();
const courseUsecase = new CourseUsecase(courseRepository);
const courseController = new CourseController(courseUsecase);

Router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.getCourses(req, res)
);
Router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.createCourse(req, res)
);
Router.patch(
  "/update",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.updateCourse(req, res)
);

export default Router;
