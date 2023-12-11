import IUser from "../interfaces/user";
import IUserBody from "../interfaces/userBody";
import Users from "../models/user.model";
class UserRepository {
  async getUsers(role: string, regex: string) {
    try {

      const users = regex
        ? await Users.find(
            { role: role, email: { $regex: regex } },
            { password: 0 }
          )
        : await Users.find({ role: role }, { password: 0 });
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
  async createUser(details: IUserBody) {
    try {
      const userDetails = await Users.create(details);
      return {
        success: true,
        message: "user details fetched",
        data: {
          id: userDetails._id,
          email: userDetails.email,
          role: userDetails.role,
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
      if (!userDetails) {
        return {
          success: false,
          message: `User not found`,
        };
      }
      return {
        success: true,
        message: "user details fetched",
        data: {
          name: userDetails.name,
          email: userDetails.email,
          avatar: userDetails.avatar,
          id: userDetails._id,
          role: userDetails.role,
          isBlock: userDetails.isBlock,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async authenticateUser(email: string) {
    try {
      const userDetails = await Users.findOne({ email });
      if (!userDetails) {
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
  async changePassword(email: string, password: string) {
    try {
      const userDetails = await Users.updateOne({email:email},{$set:{password:password}}, {
        new: true,
      });
      console.log(userDetails, "hehhehehhehehhe");
      if (!userDetails) {
        return {
          success: false,
          message: "No user found",
        };
      }
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
  async blockUser(id: string, status: boolean) {
    try {
      const userDetails = await Users.findByIdAndUpdate(id, {
        isBlock: !status,
      });
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
  async updateUser(id: string, updates: any) {
    try {
      const userDetails = await Users.findByIdAndUpdate(id, updates, {
        new: true,
      });
      console.log(userDetails, "hehhehehhehehhe");
      if (!userDetails) {
        return {
          success: false,
          message: "No user found",
        };
      }
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
  async updateRole(id: string, updates: any) {
    try {
      const userDetails = await Users.findByIdAndUpdate(
        id,
        { verification: updates, role: "instructor" },
        { new: true }
      );
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
