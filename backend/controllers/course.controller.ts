import { Request, Response } from "express";
import CourseUsecase from "../usecases/course.usecase";

class CourseController {
  private courseUsecase: CourseUsecase;
  constructor(courseUsecase: CourseUsecase) {
    this.courseUsecase = courseUsecase;
  }

  async createCourse(req: Request, res: Response) {
    try {
      console.log(req.body);
      const response = await this.courseUsecase.createCourse(
        req.body,
        req.headers["authorization"] as string
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getCourses(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getCourses(req.query);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getTopCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getTopCourse();
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async getInstructorCourses(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.getInstructorCourses(
        req.query,
        req.headers["authorization"] as string
      );
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateCourse(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.updateCourse(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateReviews(req: Request, res: Response) {
    try {
      const response = await this.courseUsecase.updateReviews(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}

export default CourseController;
