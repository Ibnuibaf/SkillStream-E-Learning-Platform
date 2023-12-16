import { Request, Response } from "express";
import UserUsecase from "../usecases/user.usecase";

class UserController {
  private userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase) {
    this.userUsecase = userUsecase;
  }

  async getUsers(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.getUsers(req.query);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.createUser(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async sendOTP(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.sendOTP(req.body.email);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.loginUser(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.changePassword(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async findUser(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.findUser(req.headers);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  // async blockUser(req: Request, res: Response) {
  //   try {
  //     const response = await this.userUsecase.blockUser(req.query);
  //     res.status(response.status).send(response.data);
  //   } catch (error) {
  //     res.status(500).send({
  //       success: false,
  //       message: "server error",
  //     });
  //   }
  // }
  async updateUser(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.updateUser(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateRole(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.updateRole(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateStatus(req: Request, res: Response) {
    try {

      const response = await this.userUsecase.updateUser(req.query);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async verifyInstructor(req: Request, res: Response) {
    try {

      const response = await this.userUsecase.updateUser(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}

export default UserController;
