import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import IUser from "../interfaces/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import MyJWTPayLoad from "../interfaces/jwt";
import IUserBody from "../interfaces/userBody";
import { IncomingHttpHeaders } from "http";

dotenv.config();

class UserUsecase {
  private userRepository: UserRepository;
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async getUsers(query:any) {
    try {
      const {role,search}=query
      const response = await this.userRepository.getUsers(role,search);
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          users: response?.data,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async createUser(body: IUserBody) {
    try {

      const { email, name, password, confirmPassword } = body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Give a valid Email",
          },
        };
      }
      if (password != confirmPassword || password.length < 6) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Retry another password by matching confirmation",
          },
        };
      }
      const emailExist=await this.userRepository.authenticateUser(email)
      if(emailExist.data){
        return {
          status: 500,
          data: {
            success: false,
            message: "User email exist already",
          },
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await this.userRepository.createUser({
        email,
        name,
        password: hashedPassword,
      });
      if(!response.data){
        return {
          status: 500,
          data: {
            success: false,
            message: response.message,
          },
        };
      }
      const token=jwt.sign(response.data,"itssecret")

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          token: token,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async changePassword(body: IUserBody) {
    try {

      const { email, password, confirmPassword } = body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Give a valid Email",
          },
        };
      }
      if (password != confirmPassword || password.length < 6) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Retry another password by matching confirmation",
          },
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await this.userRepository.changePassword(
        email,
        hashedPassword,
      );
      if(!response.data){
        return {
          status: 500,
          data: {
            success: false,
            message: response.message,
          },
        };
      }

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          user: response.data
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async sendOTP(email: string) {
    try {
      const otp: string = `${Math.floor(1000 + Math.random() * 9000)}`;
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.verifyAppEmail,
          pass: process.env.verifyAppPassword,
        },
      });
      const mailOptions = {
        from: process.env.verifyAppEmail,
        to: email,
        subject: "Verify Your Email in SkillStream",
        html: `<p>Hey ${email} Here is your Verification OTP: <br> Your OTP is <b>${otp}</b> </p><br>
              <i>Otp will Expire in 30 seconds</i>`,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log("Error occurred");
          console.log(err);
          return {
            status: 500,
            data: {
              success: false,
              message: "server error",
            },
          };
        } else {
          console.log("Code is sent");
        }
      });
      return {
        status: 200,
        data:{
          success:true,
          message:"OTP generated and send",
          otp:otp
        }
      }
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async loginUser(body: IUser) {
    try {
      const { email, password } = body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) || password.length < 6) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Invalid email or password format",
          },
        };
      }
      const response = await this.userRepository.authenticateUser(email);
      if (!response.data) {
        return {
          status: 404,
          data: {
            success: false,
            message: response.message,
          },
        };
      }
      if(response.data.isBlock){
        return {
          status: 404,
          data: {
            success: false,
            message: "User is blocked by Admin",
          },
        };
      }
      const comparedPassword = await bcrypt.compare(
        password,
        response.data.password
      );
      if (!comparedPassword) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Password is not match",
          },
        };
      }
      const token = jwt.sign(
        { id: response.data.id,email:response.data.email, role: response.data.role },
        "itssecret"
      );

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: "User Authenticated",
          token: token,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async findUser(headers:IncomingHttpHeaders) {
    try {
      const token=headers["authorization"]
      if(!token){
        return {
          status: 500,
          data: {
            success: false,
            message: "server error",
          },
        };
      }
      const decode = this.decodeToken(token);
      const response = await this.userRepository.findUser(decode.id);
      if(!response.data){
        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
          },
        }
      }
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async blockUser(query:any) {
    try {
      let { id,isBlock } = query;
      isBlock=Boolean(isBlock)
      const response = await this.userRepository.blockUser(id,isBlock);
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async updateUser(details: any) {
    try {
      const { _id } = details;
      console.log(details,"in usecase");
      
      const response = await this.userRepository.updateUser(_id, details);
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async updateRole(body: any) {
    try {
      const { id,updates } = body;
      const response = await this.userRepository.updateRole(id, updates);
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: 500,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
}

export default UserUsecase;
