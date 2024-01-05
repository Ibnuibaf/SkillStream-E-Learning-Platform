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
        order,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getOrders() {
    try {
      const orders = await Orders.find()
        .populate("userId", "name")
        .populate("courseId", "title");
      return {
        success: true,
        message: "order fetched",
        orders,
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
  async getMonthlySales() {
    try {
      const monthlyData = await Orders.aggregate([
        {
          $project: {
            userId: 1,
            courseId: 1,
            price: 1,
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalAmount: { $sum: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalAmount: 1,
          },
        },
      ]);
      const monthlyCount = await Orders.aggregate([
        {
          $project: {
            userId: 1,
            courseId: 1,
            price: 1,
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            count: 1,
          },
        },
      ]);
      if (!monthlyData || !monthlyCount) {
        return {
          success: false,
          message: `server error`,
        };
      }
      console.log(monthlyCount);

      return {
        success: true,
        message: "order fetched",
        monthlyData,
        monthlyCount,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getMonthlyInstructorSales(courses:string[]) {
    try {
      const monthlyRevenue = await Orders.aggregate([
        {
          $match: {
            courseId: { $in: courses },
          },
        },
        {
          $project: {
            userId: 1,
            courseId: 1,
            price: 1,
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalAmount: { $sum: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalAmount: { $multiply: ["$totalAmount", 0.8] },
          },
        },
      ]);
      const monthlyCount = await Orders.aggregate([
        {
          $match: {
            courseId: { $in: courses },
          },
        },
        {
          $project: {
            userId: 1,
            courseId: 1,
            price: 1,
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            count: 1,
          },
        },
      ]);
      if (!monthlyRevenue || !monthlyCount) {
        return {
          success: false,
          message: `server error`,
        };
      }
      console.log(monthlyCount);
      console.log(monthlyRevenue);

      return {
        success: true,
        message: "order fetched",
        monthlyRevenue,
        monthlyCount,
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
