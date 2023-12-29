import { Request, Response } from "express";
import PersonalchatUsecase from "../usecases/personalchat.usecase";

class PersonalchatController {
  private personalchatUsecase: PersonalchatUsecase;
  constructor(personalchatUsecase: PersonalchatUsecase) {
    this.personalchatUsecase = personalchatUsecase;
  }
  async findPersonalchat(req: Request, res: Response) {
    try {
      const response = await this.personalchatUsecase.findPersonalchat(
        req.query as { student: string; instructor: string },
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
}

export default PersonalchatController;
