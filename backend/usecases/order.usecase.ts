import CourseRepository from "../repositories/course.repository";
import OrderRepository from "../repositories/order.repository";
import UserRepository from "../repositories/user.repository";

class OrderUsecase {
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

  async createOrder(body:any) {
    try {
      const { userId, courseId } = body;
      const exist=await this.orderRepository.findOrder({userId,courseId})
      if(exist.success){
        return{
            status:500,
            data:{
                success:false,
                message:"Order already Stored"
            }
        }
      }
      const orderRes=await this.orderRepository.createOrder(body)
      if(!orderRes.success){
        return{
            status:500,
            data:{
                success:false,
                message:"Order not saved"
            }
        }
      }
      const userRes=await this.userRepository.updateUserDirect(userId,{$addToSet:{learnings:courseId}})
      if(!userRes.success){
        return{
            status:500,
            data:{
                success:false,
                message:"Order not saved"
            }
        }
      }
      const courseRes=await this.courseRepository.updateCourseDirect(courseId,{$addToSet:{enrollers:userId}})
      if(!courseRes.success){
        return{
            status:500,
            data:{
                success:false,
                message:"Order not saved"
            }
        }
      }
      return {
        status:200,
        data:{
            success:true,
            message:"Order Saved"
        }
      }
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

export default OrderUsecase