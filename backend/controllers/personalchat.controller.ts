import { Request, Response } from "express";
import PersonalchatUsecase from "../usecases/personalchat.usecase";

class PersonalchatController {
  private personalchatUsecase: PersonalchatUsecase;
  constructor(personalchatUsecase: PersonalchatUsecase) {
    this.personalchatUsecase = personalchatUsecase;
  }
  async findPersonals(req: Request, res: Response) {
    try {
      const response = await this.personalchatUsecase.findPersonals();
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async findPersonalchat(req: Request, res: Response) {
    try {
      const response = await this.personalchatUsecase.findPersonalchat(
        req.query as { student: string; instructor: string }
      );
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async findInstructorChats(req: Request, res: Response) {
    try {
      const response = await this.personalchatUsecase.findInstructorChats(
        req.query as { id: string }
      );
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async createPersonalChat(req: Request, res: Response) {
    try {
      const response = await this.personalchatUsecase.createPersonalChat(
        req.body
      );
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}


export default PersonalchatController;
