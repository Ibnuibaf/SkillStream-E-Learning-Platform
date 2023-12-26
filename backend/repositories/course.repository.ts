import ICourse from "../interfaces/course";
import Courses from "../models/course.model";

class CourseRepository {

  async createCourse(details: ICourse) {
    try {
      const course = await Courses.create(details);
      if (!course) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return{
        success:true,
        message:"Course created",
        data:course
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getCourses(regex:string) {
    try {
        const courses = regex
          ? await Courses.find({ title: { $regex: regex, $options: "i" } }).populate('instructor', 'name').populate('category', 'name')
          : await Courses.find().populate('instructor', 'name').populate('category', 'name');
        console.log(courses);
        
        return {
          success: true,
          message: "Fetch all caetgories",
          courses,
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to fetch ${error}`,
        };
      }
  }
  async getInstructorCourses(regex:string,id:string) {
    try {
        const courses = regex
          ? await Courses.find({ title: { $regex: regex, $options: "i" },instructor:id })
          : await Courses.find({instructor:id });
  
        return {
          success: true,
          message: "Fetch all caetgories",
          courses,
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to fetch ${error}`,
        };
      }
  }
  async updateCourse(id: string, updates: ICourse) {
    try {
      const updated = await Courses.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updated) {
        return {
          success: false,
          message: "Unable to update right now",
        };
      }
      return {
        success: true,
        message: "Updated the Course",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async updateCourseDirect(id: string, updates: any) {
    try {
      const updated = await Courses.updateOne({_id:id}, updates, {
        new: true,
      });
      if (!updated) {
        return {
          success: false,
          message: "Unable to update right now",
        };
      }
      return {
        success: true,
        message: "Updated the Course",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
}

export default CourseRepository
