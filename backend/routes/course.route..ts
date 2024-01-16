import express, { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import AuthMiddleware from "../middlewares/auth.middleware";
import CourseRepository from "../repositories/course.repository";
import CourseUsecase from "../usecases/course.usecase";
import CourseController from "../controllers/course.controller";
import CommunityRepository from "../repositories/community.repository";
const Router = express.Router();

const userRepository = new UserRepository();
const authMiddleware = new AuthMiddleware(userRepository);
const courseRepository = new CourseRepository();
const communityRepository = new CommunityRepository();
const courseUsecase = new CourseUsecase(
  courseRepository,
  communityRepository,
  userRepository
);
const courseController = new CourseController(courseUsecase);


Router.get("/", (req: Request, res: Response) =>
  courseController.getCourses(req, res)
);
Router.get(
  "/top",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.adminCheck(req, res, next),
  (req: Request, res: Response) => courseController.getTopCourse(req, res)
);
Router.get(
  "/instructor/analyse",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.getInstructorAnalyse(req, res)
);
Router.get(
  "/instructor",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) =>
    courseController.getInstructorCourses(req, res)
);
Router.get(
  "/admin",
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
Router.patch(
  "/review",
  (req: Request, res: Response, next: NextFunction) =>
    authMiddleware.authUser(req, res, next),
  (req: Request, res: Response) => courseController.updateReviews(req, res)
);

export default Router;
