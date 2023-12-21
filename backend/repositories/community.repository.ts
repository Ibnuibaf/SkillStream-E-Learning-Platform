import ICommunity from "../interfaces/community";
import Communities from "../models/community.model";

class CommunityRepository {
  async createCommunity(data:ICommunity) {
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
}


export default CommunityRepository