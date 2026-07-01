import { Request, Response } from "express";
import { SavedService } from "../services/saved.service";

const savedService = new SavedService();

export class SavedController {
  async toggleSave(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const { phoneId } = req.params;
      const result = await savedService.toggleSave(userId, phoneId as string);

      return res.status(200).json({
        success: true,
        data: result,
        message: result.message,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getSavedByUser(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const saved = await savedService.getSavedByUser(userId);

      return res.status(200).json({
        success: true,
        data: saved,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async isSaved(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const { phoneId } = req.params;
      const result = await savedService.isSaved(userId, phoneId as string);

      return res.status(200).json({
        success: true,
        data: { isSaved: result },
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
