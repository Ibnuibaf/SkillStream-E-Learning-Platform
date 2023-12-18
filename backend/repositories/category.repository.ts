import ICategory from "../interfaces/category";
import Categories from "../models/category.model";

class CategoryRepository {
  async createCategory(data: ICategory) {
    try {
      const category = await Categories.create(data);
      if (!category) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "Category Added",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async findCategory(name: string) {
    try {
      const category = await Categories.findOne({ name });
      if (!category) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "Category found",
        category,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async getCategories(regex: string) {
    try {
      const categories = regex
        ? await Categories.find({ name: { $regex: regex, $options: "i" } })
        : await Categories.find();

      return {
        success: true,
        message: "Fetch all caetgories",
        categories,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
  async updateCategory(id: string, updates: ICategory) {
    try {
      const updated = await Categories.findByIdAndUpdate(id, updates, {
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
        message: "Updated the Category",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch ${error}`,
      };
    }
  }
}

export default CategoryRepository;
