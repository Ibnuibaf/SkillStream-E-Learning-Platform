import CommunityRepository from "../repositories/community.repository";


class CommunityUsecase {
  private communityRepository: CommunityRepository;
  constructor(communityRepository: CommunityRepository) {
    this.communityRepository = communityRepository;
  }
  async findCommunity(query:{course:string}) {
    try {
      const { course } = query;
      const response=await this.communityRepository.findCommunity(course) 
      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
          community: response.community,
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

export default CommunityUsecase;
