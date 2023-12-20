import { Request, Response } from "express";
import CourseUsecase from "../usecases/course.usecase";

class CourseController {
  private courseUsecase: CourseUsecase;
  constructor(courseUsecase: CourseUsecase) {
    this.courseUsecase = courseUsecase;
  }

  async createCourse(req: Request, res: Response) {
    try {
        const response=await this.courseUsecase.createCourse(req.body)
        return res.status(response.status).send(response.data)
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getCourses(req: Request, res: Response) {
    try {
        const response=await this.courseUsecase.getCourses(req.query)
        res.status(response.status).send(response.data)
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateCourse(req: Request, res: Response) {
    try {
        const response=await this.courseUsecase.updateCourse(req.body)
        res.status(response.status).send(response.data)
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}

export default CourseController
