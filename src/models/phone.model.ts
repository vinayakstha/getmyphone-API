import mongoose, { Document, Schema } from "mongoose";
import { PhoneType } from "../types/phone.type";

const PhoneSchema: Schema = new Schema<PhoneType>(
  {
    title: { type: String, required: true },
    photo: { type: String, required: false },
    brand: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    condition: {
      type: String,
      enum: ["new", "like_new", "good", "fair", "poor"],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    description: { type: String, required: true },
    cpu: { type: String, required: true },
    storage: { type: String, required: true },
    ram: { type: String, required: true },
    screen: { type: String, required: true },
    battery: { type: String, required: true },
    camera: { type: String, required: true },
    usedFor: { type: String, required: true },
    negotiable: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

// enable geospatial queries
PhoneSchema.index({ location: "2dsphere" });

export interface IPhone extends PhoneType, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const PhoneModel = mongoose.model<IPhone>("Phone", PhoneSchema);
