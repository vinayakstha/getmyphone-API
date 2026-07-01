import mongoose, { Document, Schema } from "mongoose";
import { SavedType } from "../types/saved.types";

const SavedSchema: Schema = new Schema<SavedType>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: Schema.Types.ObjectId, ref: "Phone", required: true },
  },
  { timestamps: true },
);

// one save per user+phone pair
SavedSchema.index({ user: 1, phone: 1 }, { unique: true });

export interface ISaved extends SavedType, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const SavedModel = mongoose.model<ISaved>("Saved", SavedSchema);
