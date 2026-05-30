import z from "zod";
import { Request, Response } from "express";
import { SubmitRatingDTO } from "../dtos/rating.dto";
import { RatingService } from "../services/rating.service";

const ratingService = new RatingService();

export class RatingController {
  async submitRating(req: Request, res: Response) {
    try {
      const raterId = req.user?._id;
      if (!raterId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const parsedData = SubmitRatingDTO.safeParse(req.body);
      if (!parsedData.success) {
        return res
          .status(400)
          .json({ success: false, message: z.prettifyError(parsedData.error) });
      }

      const { targetId, score } = parsedData.data;
      const result = await ratingService.submitRating(raterId, targetId, score);

      return res.status(200).json({
        success: true,
        data: result,
        message: "Rating submitted successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getUserRatings(req: Request, res: Response) {
    try {
      const { targetId } = req.params;
      if (!targetId) {
        return res
          .status(400)
          .json({ success: false, message: "Target user id is required" });
      }

      const ratings = await ratingService.getUserRatings(targetId as string);

      return res.status(200).json({
        success: true,
        data: ratings,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
