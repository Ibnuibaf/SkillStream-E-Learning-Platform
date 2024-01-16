import { UserRole } from "../enums/UserRole.enum";
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
  
  async getInstructors(id: string) {
    try {
      const instructors = id
        ? await Users.findOne(
            {
              _id: id,
              role: UserRole.Instructor,
              isBlock: false,
              verified: true,
            },
            { name: 1, avatar: 1 }
          )
        : await Users.find(
            { role: UserRole.Instructor, isBlock: false, verified: true },
            { name: 1, avatar: 1 }
          );
      return {
        success: true,
        message: "All users fetched",
        instructors,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getStudents(id: string) {
    try {
      const students = id
        ? await Users.findOne(
            {
              _id: id,
              role: UserRole.Student,
              isBlock: false,
            },
            { name: 1, avatar: 1 }
          )
        : await Users.find(
            { role: UserRole.Student, isBlock: false },
            { name: 1, avatar: 1 }
          );
      return {
        success: true,
        message: "All users fetched",
        students,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getUserLearnings(userId: string) {
    try {
      const userLearnings = await Users.findOne(
        { _id: userId },
        { learnings: 1 }
      )
        .populate("learnings.course")
        .exec();
      console.log(userLearnings);

      return {
        success: true,
        message: "All users fetched",
        data: userLearnings?.learnings,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async updateLearningsProgress(
    userId: string,
    courseId: string,
    lessonId: string
  ) {
    try {
      const userLearnings = await Users.updateOne(
        { _id: userId, "learnings.course": courseId },
        {
          $addToSet: { "learnings.$.progress": lessonId },
        },
        { new: true }
      );
      console.log(userLearnings);

      return {
        success: true,
        message: "All users fetched",
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
      if (!userDetails) {
        return {
          success: false,
          message: "user details nopt stored",
        };
      }
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
      const userDetails = await Users.findById(id, { password: 0 });
      if (!userDetails) {
        return {
          success: false,
          message: `User not found`,
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
  async authenticateUser(email: string) {
    try {
      const userDetails = await Users.findOne({ email: email });
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
      const userDetails = await Users.updateOne(
        { email: email },
        { $set: { password: password } },
        {
          new: true,
        }
      );
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
  async isCourseInLearnings(userId: string, learningId: string) {
    try {
      const user = await Users.findOne({
        _id: userId,
        learnings: { $in: [learningId] },
      });

      return !!user;
    } catch (error) {
      console.error("Error checking ObjectId in learnings:", error);
      return false;
    }
  }
  // async blockUser(id: string, status: boolean) {
  //   try {
  //     const userDetails = await Users.findByIdAndUpdate(id, {
  //       isBlock: !status,
  //     });
  //     return {
  //       success: true,
  //       message: "user has been blocked",
  //       data: userDetails,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: `Failed to block ${error}`,
  //     };
  //   }
  // }
  async updateUserDetails(userId: string, updates: any) {
    try {
      const userDetails = await Users.findByIdAndUpdate(userId, updates, {
        new: true,
      });
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
  async userWalletWithdraw(userId: string, amount: number) {
    try {
      const userDetails = await Users.findById(userId);
      if (!userDetails) {
        return {
          success: false,
          message: "No user found",
        };
      }
      if (userDetails.wallet.balance < amount) {
        return {
          success: true,
          message: "Amount has been made withdrawal",
        };
      }
      userDetails.wallet.balance = Math.floor(
        userDetails.wallet.balance - amount
      );
      userDetails.wallet.transactions.push({
        date: new Date(),
        amount: amount,
        type: "dr",
        remark: "Withdraw amount from Wallet",
      });
      await userDetails.save();
      return {
        success: true,
        message: "Amount has been made withdrawal",
        data: userDetails,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
  async learningCertify(userId: string, learning: string) {
    try {
      const user = await Users.updateOne(
        { _id: userId, "learnings._id": learning },
        { $set: { "learnings.$.certificate": true } },
        { new: true }
      );
      if (!user) {
        return {
          success: true,
          message: "Failed to update certificate",
        };
      }
      return {
        success: true,
        message: "Updated the certificate of user",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
  async updateUserTeachings(userId: string, updates: any) {
    try {
      const userDetails = await Users.findById(userId);
      if (!userDetails) {
        return {
          success: false,
          message: "No user found",
        };
      }
      userDetails.teachings.push(updates);
      const result = await userDetails.save();

      if (result) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to save community" };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to update ${error}`,
      };
    }
  }
  async updateUser(id: string, updates: any) {
    try {
      const userDetails = await Users.findByIdAndUpdate(id, updates, {
        new: true,
      });
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
  async updateUserDirect(id: string, updates: any) {
    try {
      const userDetails = await Users.updateOne({ _id: id }, updates, {
        new: true,
      });
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
  async getWishlist(id: string) {
    try {
      const userDetails = await Users.findById(id).populate("wishlist")
      return {
        success: true,
        message: "user details fetched",
        data: userDetails?.wishlist,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async addToWishlist(id: string, course: string) {
    try {
      const userDetails = await Users.updateOne(
        { _id: id },
        { $addToSet: { wishlist: course } },
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
  async removeFromWishlist(id: string, course: string) {
    try {
      const userDetails = await Users.findById(id);
      if (!userDetails) {
        return{
          success: false,
          message: `Failed to find user`,
        };
      }
      const newWishList = userDetails?.wishlist.filter(
        (courseId ) => courseId as unknown as string != course
      );
      userDetails.wishlist = newWishList;
      await userDetails?.save();
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
