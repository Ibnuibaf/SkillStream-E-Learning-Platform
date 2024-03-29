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
  async findPersonals() {
    try {
      const response = await this.personalchatRepository.findPersonals();
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
  async findPersonalchat(query: { student: string; instructor: string }) {
    try {
      const { student, instructor } = query;
      const response = await this.personalchatRepository.findPersonalchat({
        student,
        instructor,
      });
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
  async createPersonalChat(body: any) {
    try {
      const { student, instructor } = body;
      const today = new Date();
      const validity = new Date(today);
      validity.setDate(today.getDate() + 30);
      const isExist = await this.personalchatRepository.findPersonalchat({
        student,
        instructor,
      });
      if (isExist.success) {
        const response = await this.personalchatRepository.updateChatValidity({
          student,
          instructor,
          validity,
        });

        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
          },
        };
      } else {
        const response = await this.personalchatRepository.createPersonalchat({
          student,
          instructor,
          chats: [],
          validity: validity,
        });

        return {
          status: response.success ? 200 : 500,
          data: {
            success: response.success,
            message: response.message,
          },
        };
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
}

export default PersonalchatUsecase;
