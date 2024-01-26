import ICourse from "../interfaces/course";
import MyJWTPayLoad from "../interfaces/jwt";
import CommunityRepository from "../repositories/community.repository";
import CourseRepository from "../repositories/course.repository";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";


class CourseUsecase {
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  private courseRepository: CourseRepository;
  private communityRepository: CommunityRepository;
  private userRepository: UserRepository;
  constructor(
    courseRepository: CourseRepository,
    communityRepository: CommunityRepository,
    userRepository: UserRepository
  ) {
    this.courseRepository = courseRepository;
    this.communityRepository = communityRepository;
    this.userRepository = userRepository;
  }

  async createCourse(fields: ICourse, token: string) {
    try {
      if (
        !fields.title ||
        !fields.description ||
        !fields.language ||
        !fields.level ||
        !fields.category ||
        !fields.price ||
        !fields.cover
      ) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Provide necessary fields",
          },
        };
      }
      const user = this.decodeToken(token);
      fields = { ...fields, instructor: user.id };
      const res = await this.courseRepository.createCourse(fields);
      if (!res.data) {
        return {
          status: 500,
          data: {
            success: res.success,
            message: res.message,
          },
        };
      }
      await this.userRepository.updateUserTeachings(user.id, res.data._id);
      const response = await this.communityRepository.createCommunity({
        course: res.data._id,
        chats: [],
      });

      return {
        status: response.success ? 200 : 500,
        data: {
          success: response.success,
          message: response.message,
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
  async getCourses(query: any) {
    try {
      const { search } = query;
      const res = await this.courseRepository.getCourses(search);

      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          courses: res.courses,
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
  async getTopCourse() {
    try {
      const res = await this.courseRepository.getTopCourse();
      if (!res.courses) {
        return {
          status: res.success ? 200 : 500,
          data: {
            success: res.success,
            message: res.message,
          },
        };
      }
      let topCourse = res.courses[0];
      res.courses.forEach((course) => {
        if (course.enrollers.length > topCourse.enrollers.length) {
          topCourse = course;
        }
      });
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          topCourse,
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
  async getInstructorAnalyse(token: string) {
    try {
      const user = this.decodeToken(token);
      const res = await this.courseRepository.getInstructorAnalyse(user.id);
      if (!res.courses) {
        return {
          status: res.success ? 200 : 500,
          data: {
            success: res.success,
            message: res.message,
          },
        };
      }
      let enrollers = 0;

      res.courses.forEach((course) => {
        enrollers += course.enrollers.length;
      });
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          enrollers,
          courses: res.courses.length,
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
  async getInstructorCourses(query: any, token: string) {
    try {
      const { search } = query;
      const user = this.decodeToken(token);
      const res = await this.courseRepository.getInstructorCourses(
        search,
        user.id
      );

      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          courses: res.courses,
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
  async updateCourse(data: ICourse) {
    try {
      let { _id } = data;

      const res = await this.courseRepository.updateCourse(_id as string, data);
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
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
  async updateReviews(data: any) {
    try {
      let { courseId, user, feedback, rating } = data;

      const res = await this.courseRepository.updateReviews(courseId, {
        user,
        feedback,
        rating,
      });
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
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
export default CourseUsecase;
