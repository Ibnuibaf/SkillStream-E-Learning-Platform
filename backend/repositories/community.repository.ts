import { Response } from 'express';
import ICommunity, { IChat } from "../interfaces/community";
import Communities from "../models/community.model";

class CommunityRepository {
  async createCommunity(data: ICommunity) {
    try {
      const community = await Communities.create(data);
      if (!community) {
        return {
          success: false,
          message: `server error`,
        };
      }

      
      return {
        success: true,
        message: "Community Added",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getChatHistory(roomId:string){
    try {
      const response=await Communities.findOne({course:roomId})
      return response?.chats
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }

  }
  async findCommunity(course:string){
    try {
      const community=await Communities.findOne({course:course})
      if (!community) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "Community found",
        community
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }

  }
  async addMessageToCommunity(data: IChat, roomId: string) {
    try {
      const community = await Communities.findOne({ course: roomId });

      if (!community) {
        return { success: false, message: "Community not found" };
      }

      community.chats.push({ user: data.user, message: data.message,image:data.image });

      // Save the updated community
      const result = await community.save();

      if (result) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to save community" };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
}

export default CommunityRepository;
