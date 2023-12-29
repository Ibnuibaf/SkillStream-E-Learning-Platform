import { Response } from "express";
import PersonalChats from "../models/personalchat.model";
import { IChat, IPersonalChat } from "../interfaces/personalchat";

class PersonalchatRepository {
  async createPersonalchat(data: IPersonalChat) {
    try {
      const personalchat = await PersonalChats.create(data);
      if (!personalchat) {
        return {
          success: false,
          message: `server error`,
        };
      }

      return {
        success: true,
        message: "Personalchat Added",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  //   async getChatHistory(roomId: string) {
  //     try {
  //       const response = await PersonalChats.findOne({ course: roomId });
  //       return response?.chats;
  //     } catch (error) {
  //       return {
  //         success: false,
  //         message: `Failed to fetch ${error}`,
  //       };
  //     }
  //   }
  async findPersonalchat({
    student,
    instructor,
  }: {
    student: string;
    instructor: string;
  }) {
    try {
      const personalchat = await PersonalChats.findOne({
        student: student,
        instructor: instructor,
      });
      if (!personalchat) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "Personalchat found",
        personalchat,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async findInstructorChats(id: string) {
    try {
      const personalchats = await PersonalChats.find({
        instructor: id,
      }).populate("student","name avatar")
      return {
        success: true,
        message: "Personalchat found",
        personalchats,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async addMessageToPersonalchat(data: IChat, roomId: string) {
    try {
      const personalchat = await PersonalChats.findById(roomId);

      if (!personalchat) {
        return { success: false, message: "Personalchat not found" };
      }

      personalchat.chats.push({
        user: data.user,
        message: data.message,
        image: data.image,
      });

      // Save the updated personalchat
      const result = await personalchat.save();

      if (result) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to save personalchat" };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
}

export default PersonalchatRepository;
