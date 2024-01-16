import ICategory from "../interfaces/category";
import CategoryRepository from "../repositories/category.repository";

class CategoryUsecase {
  private categoryRepository: CategoryRepository;
  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  
  async createCategory(data: ICategory) {
    try {
      let { name } = data;
      name = name.toLowerCase();
      const categoryExist = await this.categoryRepository.findCategory(name);      
      if (categoryExist.success) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Category Exist",
          },
        };
      }
      const res = await this.categoryRepository.createCategory({ name });
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
  async getCategories(query: any) {
    try {
      const { search } = query;
      const res = await this.categoryRepository.getCategories(search);
      return {
        status: res.success ? 200 : 500,
        data: {
          success: res.success,
          message: res.message,
          categories: res.categories,
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
  async updateCategory(data:ICategory) {
    try {
      let { _id,name,block } = data;
      name = name.toLowerCase();
      const categoryExist = await this.categoryRepository.findCategory(name);      
      
      if (categoryExist.success && categoryExist.category?._id != _id) {
        return {
          status: 404,
          data: {
            success: false,
            message: "Category Exist",
          },
        };
      }
      const res = await this.categoryRepository.updateCategory(_id as string,{_id,name,block});
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

export default CategoryUsecase;
