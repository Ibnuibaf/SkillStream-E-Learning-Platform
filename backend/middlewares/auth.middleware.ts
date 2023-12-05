import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import MyJWTPayLoad from "../interfaces/jwt";

class AuthMiddleware {
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
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
      const response = this.decodeToken(token);
      if (response.id) {
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
