import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import MyJWTPayLoad from "../interfaces/jwt";
import UserRepository from '../repositories/user.repository'
import { UserRole } from "../enums/UserRole.enum";


class AuthMiddleware {
  private userRepository: UserRepository;
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async authUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return {
          status: 500,
          data: {
            success: false,
            message: "server error",
          },
        };
      }
      const tokenPayload = this.decodeToken(token);
      const response=await this.userRepository.findUser(tokenPayload.id) 
      if (response.data?.id && !response.data.isBlock) {
        next();
      } else {
        res.status(500).send({
          success: false,
          message: "User is Blocked, Try again after login in",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
  async adminCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return {
          status: 500,
          data: {
            success: false,
            message: "server error",
          },
        };
      }
      const tokenPayload = this.decodeToken(token );
      if (tokenPayload.role==UserRole.Admin) {
        next();
      } else {
        res.status(500).send({
          success: false,
          message: "Try again after login in",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}

export default AuthMiddleware
