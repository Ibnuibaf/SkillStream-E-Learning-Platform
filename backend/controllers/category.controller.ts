import { Response, Request } from "express";
import CategoryUsecase from "../usecases/category.usecase";

class CategoryController {
  private categoryUsecase: CategoryUsecase;
  constructor(categoryUsercase: CategoryUsecase) {
    this.categoryUsecase = categoryUsercase;
  }

  async createCategory(req: Request, res: Response) {
    try {
        const response=await this.categoryUsecase.createCategory(req.body)
        res.status(response.status).send(response.data)
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  
  async getCategories(req: Request, res: Response) {
    try {
        const response=await this.categoryUsecase.getCategories(req.query)
        res.status(response.status).send(response.data)
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateCategory(req: Request, res: Response) {
    try {
        const response=await this.categoryUsecase.updateCategory(req.body)
        res.status(response.status).send(response.data)
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}

export default CategoryController