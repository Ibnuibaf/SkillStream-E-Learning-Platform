import IUser from "../interfaces/user";
import IUserBody from "../interfaces/userBody";
import Users from "../models/user.model";
class UserRepository {
  async getUsers() {
    try {
      const users = await Users.find({}, { password: 0 });
      return {
        success: true,
        message: "All users fetched",
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async createUser(details:IUserBody){
    try {
      console.log(details,"From repository");
      const userDetails=await Users.create(details)
      return {
        success: true,
        message: "user details fetched",
        data: {
          id:userDetails._id,
          email:userDetails.email,
          role:userDetails.role
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }

  }
  async findUser(id: string) {
    try {
      const userDetails = await Users.findById(id);
      if(!userDetails){
        return {
          success: false,
          message: `User not found`,
        };
      }
      return {
        success: true,
        message: "user details fetched",
        data: {
          name:userDetails.name,
          email:userDetails.email,
          avatar:userDetails.avatar,
          id:userDetails._id,
          role:userDetails.role
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async authenticateUser(email:string) {
    try {
      const userDetails = await Users.findOne({email});
      if(!userDetails){
        return {
          success: true,
          message: "No user found",
        };
      }
      return {
        success: true,
        message: "user details fetched",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async blockUser(id:string) {
    try {
      const userDetails = await Users.findByIdAndUpdate(id,{isBlock:true});
      return {
        success: true,
        message: "user has been blocked",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to block ${error}`,
      };
    }
  }
  async updateUser(id:string,updates:IUser) {
    try {
      const userDetails = await Users.findByIdAndUpdate(id,updates,{new:true});
      return {
        success: true,
        message: "user details updated",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
}

export default UserRepository;
