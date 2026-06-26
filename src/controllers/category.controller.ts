import z from "zod";
import { Request, Response } from "express";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../dtos/category.dto";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const parsedData = CreateCategoryDTO.safeParse(req.body);
      if (!parsedData.success) {
        return res
          .status(400)
          .json({ success: false, message: z.prettifyError(parsedData.error) });
      }
      if (req.file) {
        parsedData.data.image = `/uploads/${req.file.filename}`;
      }
      const category = await categoryService.createCategory(parsedData.data);
      return res.status(201).json({
        success: true,
        data: category,
        message: "Category created successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id as string);
      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parsedData = UpdateCategoryDTO.safeParse(req.body);
      if (!parsedData.success) {
        return res
          .status(400)
          .json({ success: false, message: z.prettifyError(parsedData.error) });
      }
      if (req.file) {
        parsedData.data.image = `/uploads/${req.file.filename}`;
      }
      const updatedCategory = await categoryService.updateCategory(
        id as string,
        parsedData.data,
      );
      return res.status(200).json({
        success: true,
        data: updatedCategory,
        message: "Category updated successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id as string);
      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
