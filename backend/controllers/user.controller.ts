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
  async getUserLearnings(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.getUserLearnings(req.headers["authorization"] as string);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getInstructors(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.getInstructors(req.query);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async getStudents(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.getStudents(req.query);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async updateLearningsProgress(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.updateLearningsProgress(req.headers["authorization"] as string,req.body);
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
      const response = await this.userUsecase.sendOTP(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async verifyOTP(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.verifyOTP(req.body);
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
  async updateUserDetails(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.updateUserDetails(req.body,req.headers["authorization"] as string);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async userWalletWithdraw(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.userWalletWithdraw(req.body);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async learningCertify(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.learningCertify(req.body,req.headers["authorization"] as string);
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
  async getWishlist(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.getWishlist(req.headers["authorization"] as string);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async addToWishlist(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.addToWishlist(req.body,req.headers["authorization"] as string);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  
  async removeFromWishlist(req: Request, res: Response) {
    try {
      const response = await this.userUsecase.removeFromWishlist(req.body,req.headers["authorization"] as string);
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
