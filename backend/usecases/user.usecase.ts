import axios from "axios";
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
import { HttpStatus } from "../enums/HttpStatus.enum";
import { UserRole } from "../enums/UserRole.enum";

dotenv.config();

class UserUsecase {
  private userRepository: UserRepository;
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async getUsers(query: any) {
    try {
      const { role, search } = query;
      const response = await this.userRepository.getUsers(role, search);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          users: response?.data,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async getUserLearnings(token: string) {
    try {
      const user = this.decodeToken(token);
      const response = await this.userRepository.getUserLearnings(user.id);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          learnings: response?.data,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async getInstructors(query:any) {
    try {
      const {id}=query
      const response = await this.userRepository.getInstructors(id);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          instructors: response.instructors,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async getStudents(query:any) {
    try {
      const {id}=query
      const response = await this.userRepository.getStudents(id);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          instructors: response.students,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  // async googleRegistration() {
  //   try {
  //     passport.use(
  //       new GoogleStrategy(
  //         {
  //           clientID: process.env.GOOGLE_CLIENT_ID as string,
  //           clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //           callbackURL: "/api/user/google/callback",
  //           scope: ["profile", "email"],
  //         },
  //         async (
  //           _accessToken: string,
  //           _refreshToken: string,
  //           profile: any,
  //           done
  //         ) => {
  //           const res =await  this.userRepository.findUser(profile.id);
  //           if(res.data){
  //             return done(null,res.data)
  //           }else{
  //             const newUser= await this.userRepository.createUser({name:profile.displayName,email:profile.email[0].value,})
  //           }
  //         }
  //       )
  //     );
  //   } catch (error) {
  //     return {
  //       status: HttpStatus.ServerError,
  //       data: {
  //         success: false,
  //         message: "server error",
  //       },
  //     };
  //   }
  // }
  async updateLearningsProgress(token: string, body: any) {
    try {
      const user = this.decodeToken(token);
      const { courseId, lessonId } = body;
      const response = await this.userRepository.updateLearningsProgress(
        user.id,
        courseId,
        lessonId
      );
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async createUser(body: any) {
    try {
      if (body.googleAccessToken) {
        const { googleAccessToken } = body;

        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${googleAccessToken}`,
            },
          }
        );
        const name = response.data.given_name;
        const email = response.data.email;

        const res = await this.userRepository.authenticateUser(email);

        if (res.data) {
          return {
            status: HttpStatus.ServerError,
            data: {
              success: false,
              message: "Account Exist already",
            }
          };
        }

        const result = await this.userRepository.createUser({
          email,
          name,
        });
        if (!result.data) {
          return {
            status: HttpStatus.ServerError,
            data: {
              success: false,
              message: result.message,
            },
          };
        }
        const token = jwt.sign(result.data, "itssecret");

        return {
          status: result.success ? HttpStatus.Success : HttpStatus.ServerError,
          data: {
            success: result.success,
            message: result.message,
            token: token,
          },
        };
      } else {
        const { email, name, password, confirmPassword } = body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!emailRegex.test(email)) {
          return {
            status: HttpStatus.ServerError,
            data: {
              success: false,
              message: "Give a valid Email",
            },
          };
        }
        if (
          password != confirmPassword ||
          !passwordRegex.test(password as string)
        ) {
          return {
            status: HttpStatus.ServerError,
            data: {
              success: false,
              message: "Retry another password by matching confirmation",
            },
          };
        }
        const emailExist = await this.userRepository.authenticateUser(email);
        if (emailExist.data) {
          return {
            status: HttpStatus.ServerError,
            data: {
              success: false,
              message: "User email exist already",
            },
          };
        }
        const hashedPassword = await bcrypt.hash(password as string, 10);
        const response = await this.userRepository.createUser({
          email,
          name,
          password: hashedPassword,
        });
        if (!response.data) {
          return {
            status: HttpStatus.ServerError,
            data: {
              success: false,
              message: response.message,
            },
          };
        }
        const token = jwt.sign(response.data, "itssecret");

        return {
          status: response.success
            ? HttpStatus.Success
            : HttpStatus.ServerError,
          data: {
            success: response.success,
            message: response.message,
            token: token,
          },
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
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
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!emailRegex.test(email)) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "Give a valid Email",
          },
        };
      }
      if (
        password != confirmPassword ||
        !passwordRegex.test(password as string)
      ) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "Retry another password by matching confirmation",
          },
        };
      }
      const hashedPassword = await bcrypt.hash(password as string, 10);
      const response = await this.userRepository.changePassword(
        email,
        hashedPassword
      );
      if (!response.data) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: response.message,
          },
        };
      }

      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async sendOTP(email: string) {
    try {
      const emailExist = await this.userRepository.authenticateUser(email);
      if (emailExist.data) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "User email exist already",
          },
        };
      }
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
            status: HttpStatus.ServerError,
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
        status: HttpStatus.Success,
        data: {
          success: true,
          message: "OTP generated and send",
          otp: otp,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async loginUser(body: any) {
    try {
      if (body.googleAccessToken) {
        const { googleAccessToken } = body;

        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${googleAccessToken}`,
            },
          }
        );
        const name = response.data.given_name;
        const email = response.data.email;

        const res = await this.userRepository.authenticateUser(email);

        if (!res.data) {
          return {
            status: HttpStatus.ServerError,
            data: {
              success: false,
              message: "User not found",
            },
          };
        }
        const token = jwt.sign(
          { id: res.data._id, email: res.data.email, role: res.data.role },
          "itssecret"
        );

        return {
          status: res.success ? HttpStatus.Success : HttpStatus.ServerError,
          data: {
            success: res.success,
            message: "User Authenticated",
            token: token,
            admin: res.data.role == UserRole.Admin,
          },
        };
      } else {
        const { email, password } = body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!emailRegex.test(email) || !passwordRegex.test(password)) {
          return {
            status: HttpStatus.NotFound,
            data: {
              success: false,
              message: "Invalid email or password format",
            },
          };
        }
        const response = await this.userRepository.authenticateUser(email);
        if (!response.data) {
          return {
            status: HttpStatus.NotFound,
            data: {
              success: false,
              message: response.message,
            },
          };
        }
        if (response.data.isBlock) {
          return {
            status: HttpStatus.NotFound,
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
            status: HttpStatus.NotFound,
            data: {
              success: false,
              message: "Password is not match",
            },
          };
        }
        const token = jwt.sign(
          {
            id: response.data.id,
            email: response.data.email,
            role: response.data.role,
          },
          "itssecret"
        );

        return {
          status: response.success
            ? HttpStatus.Success
            : HttpStatus.ServerError,
          data: {
            success: response.success,
            message: "User Authenticated",
            token: token,
            admin: response.data.role == UserRole.Admin,
          },
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async findUser(headers: IncomingHttpHeaders) {
    try {
      const token = headers["authorization"];
      if (!token) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "server error",
          },
        };
      }
      const decode = this.decodeToken(token);
      const response = await this.userRepository.findUser(decode.id);
      if (!response.data) {
        return {
          status: response.success
            ? HttpStatus.Success
            : HttpStatus.ServerError,
          data: {
            success: response.success,
            message: response.message,
          },
        };
      }
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  // async blockUser(query:any) {
  //   try {
  //     let { id,isBlock } = query;
  //     isBlock=Boolean(isBlock)
  //     const response = await this.userRepository.blockUser(id,isBlock);
  //     return {
  //       status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
  //       data: {
  //         success: response.success,
  //         message: response.message,
  //         user: response.data,
  //       },
  //     };
  //   } catch (error) {
  //     return {
  //       status: HttpStatus.ServerError,
  //       data: {
  //         success: false,
  //         message: "server error",
  //       },
  //     };
  //   }
  // }
  async updateUserDetails(details: any, token: string) {
    try {
      const user = this.decodeToken(token);
      let { password } = details;
      if (password) {
        details.password = await bcrypt.hash(password, 10);
      }
      // console.log(user,details);
      const response = await this.userRepository.updateUserDetails(
        user.id,
        details
      );
      // console.log(response);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async userWalletWithdraw(details: any) {
    try {
      let { user,amount } = details;
      // console.log(user,details);
      const response = await this.userRepository.userWalletWithdraw(
        user,
        amount
      );
      // console.log(response);
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
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

      const response = await this.userRepository.updateUser(_id, details);
      if (details.verified && response.data) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.verifyAppEmail,
            pass: process.env.verifyAppPassword,
          },
        });
        const mailOptions = {
          from: process.env.verifyAppEmail,
          to: response.data?.email,
          subject: "SkillStream approved you as Instructor",
          html: `<div style="display:flex;justify-content:center ">
          <div style="border-width:1px">
          <p>Hey ${response.data?.name} You are now able to instruct students in <b style="color:red;">SkillStream</b> <br> Good luck for your bright future with skillstream</p><br>
          <i>Keep your trust and ethics with us and lets embark the journey</i>
          </div>
          </div>`,
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.log("Error occurred");
            console.log(err);
            return {
              status: HttpStatus.ServerError,
              data: {
                success: false,
                message: "server error",
              },
            };
          }
        });
      }
      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
  async updateRole(body: any) {
    try {
      const { id, updates } = body;
      const response = await this.userRepository.updateRole(id, updates);

      return {
        status: response.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: response.success,
          message: response.message,
          user: response.data,
        },
      };
    } catch (error) {
      return {
        status: HttpStatus.ServerError,
        data: {
          success: false,
          message: "server error",
        },
      };
    }
  }
}

export default UserUsecase;
