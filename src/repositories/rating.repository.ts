import mongoose from "mongoose";
import { RatingModel, IRating } from "../models/rating.model";

export interface IRatingRepository {
  upsertRating(
    raterId: string,
    targetId: string,
    score: number,
  ): Promise<IRating>;
  getAggregateByTargetId(
    targetId: string,
  ): Promise<{ average: number; count: number }>;
  getRatingsByTargetId(targetId: string): Promise<IRating[]>;
}

export class RatingRepository implements IRatingRepository {
  async upsertRating(
    raterId: string,
    targetId: string,
    score: number,
  ): Promise<IRating> {
    const rating = await RatingModel.findOneAndUpdate(
      { raterId, targetId },
      { score },
      { upsert: true, new: true },
    );
    return rating!;
  }

  async getAggregateByTargetId(
    targetId: string,
  ): Promise<{ average: number; count: number }> {
    const [agg] = await RatingModel.aggregate([
      { $match: { targetId: new mongoose.Types.ObjectId(targetId) } },
      {
        $group: {
          _id: null,
          average: { $avg: "$score" },
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      average: agg ? parseFloat(agg.average.toFixed(2)) : 0,
      count: agg?.count ?? 0,
    };
  }

  async getRatingsByTargetId(targetId: string): Promise<IRating[]> {
    return await RatingModel.find({ targetId });
  }
}
