import Orders from "../models/order.model";
import IOrder from "../interfaces/order";
class OrderRepository {
  async createOrder(data: IOrder) {
    try {
      const order = await Orders.create(data);
      if (!order) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "order created",
        order
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async findOrder(fields: any) {
    try {
      const orderExist = await Orders.findOne(fields);
      if (!orderExist) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "order created",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
}

export default OrderRepository;
