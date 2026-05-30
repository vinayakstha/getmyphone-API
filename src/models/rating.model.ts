import mongoose, { Document, Schema } from "mongoose";
import { RatingType } from "../types/rating.type";

const RatingSchema: Schema = new Schema<RatingType>(
  {
    raterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  },
);

RatingSchema.index({ raterId: 1, targetId: 1 }, { unique: true });

export interface IRating extends RatingType, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const RatingModel = mongoose.model<IRating>("Rating", RatingSchema);
