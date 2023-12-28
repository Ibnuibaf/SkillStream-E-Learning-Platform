import { Request, Response } from "express";
import CommunityUsecase from "../usecases/community.usecase";

class CommunityController {
  private communityUsecase: CommunityUsecase;
  constructor(communityUsecase: CommunityUsecase) {
    this.communityUsecase = communityUsecase;
  }
  async findCommunity(req: Request, res: Response) {
    try {
      const response = await this.communityUsecase.findCommunity(
        req.query as { course: string }
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

export default CommunityController;
