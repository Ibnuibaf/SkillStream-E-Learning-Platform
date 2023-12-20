import ICourse from "../interfaces/course";
import CourseRepository from "../repositories/course.repository";

class CourseUsecase {
  private courseRepository: CourseRepository;
  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async createCourse(fields: ICourse) {
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
      const res = await this.courseRepository.createCourse(fields);
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
  async getCourses(query: any) {
    try {
      const { search } = query;
      const res = await this.courseRepository.getCourses(search);
    //   console.log(res.courses);
      
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
  async updateCourse(data:ICourse) {
    try {
      let { _id} = data;    
      const res = await this.courseRepository.updateCourse(_id as string,data);
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
