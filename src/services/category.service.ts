import { CreateCategoryDTO, UpdateCategoryDTO } from "../dtos/category.dto";
import { CategoryRepository } from "../repositories/category.repository";
import { HttpError } from "../errors/http-error";

const categoryRepository = new CategoryRepository();

export class CategoryService {
  async createCategory(data: CreateCategoryDTO) {
    const nameCheck = await categoryRepository.getCategoryByName(data.name);
    if (nameCheck) {
      throw new HttpError(403, "Category already exists");
    }
    const category = await categoryRepository.createCategory(data);
    return category;
  }

  async getCategoryById(id: string) {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }
    return category;
  }

  async getAllCategories() {
    const categories = await categoryRepository.getAllCategories();
    return categories;
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }
    const updatedCategory = await categoryRepository.updateCategory(id, data);
    return updatedCategory;
  }

  async deleteCategory(id: string) {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
      throw new HttpError(404, "Category not found");
    }
    const result = await categoryRepository.deleteCategory(id);
    return result;
  }
}
