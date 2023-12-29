import jwt from "jsonwebtoken";
import PersonalchatRepository from "../repositories/personalchat.repository";
import MyJWTPayLoad from "../interfaces/jwt";

class PersonalchatUsecase {
  private personalchatRepository: PersonalchatRepository;
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  constructor(personalchatRepository: PersonalchatRepository) {
    this.personalchatRepository = personalchatRepository;
  }
  async findPersonalchat(
    query: { student: string; instructor: string },
    token: string
  ) {
    try {
      const { student, instructor } = query;
      const user = await this.decodeToken(token);
      const response = await this.personalchatRepository.findPersonalchat(
        student
          ? { student, instructor: user.id }
          : { student: user.id, instructor }
      );
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          personalchat: response.personalchat,
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
  async findInstructorChats(query: { id: string }) {
    try {
      const response = await this.personalchatRepository.findInstructorChats(
        query.id
      );
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          personalchats: response.personalchats,
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

export default PersonalchatUsecase;
