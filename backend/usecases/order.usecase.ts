import { HttpStatus } from "../enums/HttpStatus.enum";
import jwt from "jsonwebtoken";
import CourseRepository from "../repositories/course.repository";
import OrderRepository from "../repositories/order.repository";
import UserRepository from "../repositories/user.repository";
import MyJWTPayLoad from "../interfaces/jwt";


class OrderUsecase {
  private decodeToken(token: string): MyJWTPayLoad {
    return jwt.verify(token, "itssecret") as MyJWTPayLoad;
  }
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;
  private courseRepository: CourseRepository;
  constructor(
    orderRepository: OrderRepository,
    userRepository: UserRepository,
    courseRepository: CourseRepository
  ) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.courseRepository = courseRepository;
  }

  async createOrder(body: any) {
    try {
      const { userId, courseId } = body;
      const exist = await this.orderRepository.findOrder({ userId, courseId });
      if (exist.success) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Order already Stored",
          },
        };
      }
      const response = await this.courseRepository.findCourse(body.courseId);
      if (!response.course) {
        return {
          status: 500,
          data: {
            success: false,
            message: "No Course Found",
          },
        };
      }
      const orderRes = await this.orderRepository.createOrder({
        userId: body.userId,
        courseId: body.courseId,
        price: Math.floor(
          response.course?.price -
            (response.course?.offer * response.course?.price) / 100
        ) as number,
        date: new Date(),
      });
      if (!orderRes.order) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Order not saved",
          },
        };
      }
      const userRes = await this.userRepository.updateUserDirect(userId, {
        $addToSet: { learnings: { course: courseId, progress: [] } },
        $inc: { "wallet.balance": 0.8 * orderRes.order?.price },
        $push: {
          "wallet.transactions": {
            date: new Date(),
            amount: 0.8 * orderRes.order?.price,
            type: "cr",
            remark: "Purchase profit added to wallet",
          },
        },
      });
      if (!userRes.success) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Order not saved",
          },
        };
      }
      const courseRes = await this.courseRepository.updateCourseDirect(
        courseId,
        { $addToSet: { enrollers: userId } }
      );
      if (!courseRes.success) {
        return {
          status: 500,
          data: {
            success: false,
            message: "Order not saved",
          },
        };
      }
      return {
        status: 200,
        data: {
          success: true,
          message: "Order Saved",
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
  async getOrders() {
    try {
      const res = await this.orderRepository.getOrders();
      return {
        status: res.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: res.success,
          message: res.message,
          orders: res.orders,
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
  async getMonthlySales() {
    try {
      const res = await this.orderRepository.getMonthlySales();
      return {
        status: res.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: res.success,
          message: res.message,
          monthlyData: res.monthlyData,
          monthlyCount: res.monthlyCount,
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
  async getMonthlyInstructorSales(token: string) {
    try {
      const user = this.decodeToken(token);
      const courseRes = await this.courseRepository.getInstructorAnalyse(
        user.id
      );
      if (!courseRes.courses) {
        return {
          status: courseRes.success
            ? HttpStatus.Success
            : HttpStatus.ServerError,
          data: {
            success: courseRes.success,
            message: courseRes.message,
          },
        };
      }
      let instructorCourses: string[] = [];
      for (let i = 0; i < courseRes.courses.length; i++) {
        instructorCourses.push(courseRes.courses[i]._id as string);
      }
      const res = await this.orderRepository.getMonthlyInstructorSales(
        instructorCourses
      );
      return {
        status: res.success ? HttpStatus.Success : HttpStatus.ServerError,
        data: {
          success: res.success,
          message: res.message,
          monthlyCount: res.monthlyCount,
          monthlyRevenue: res.monthlyRevenue,
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

export default OrderUsecase;
