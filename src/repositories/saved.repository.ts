import { SavedModel, ISaved } from "../models/saved.model";

export interface ISavedRepository {
  save(userId: string, phoneId: string): Promise<ISaved>;
  unsave(userId: string, phoneId: string): Promise<boolean>;
  getSavedByUser(userId: string): Promise<ISaved[]>;
  isSaved(userId: string, phoneId: string): Promise<boolean>;
}

export class SavedRepository implements ISavedRepository {
  async save(userId: string, phoneId: string): Promise<ISaved> {
    const saved = new SavedModel({ user: userId, phone: phoneId });
    return await saved.save();
  }

  async unsave(userId: string, phoneId: string): Promise<boolean> {
    const result = await SavedModel.findOneAndDelete({
      user: userId,
      phone: phoneId,
    });
    return result ? true : false;
  }

  async getSavedByUser(userId: string): Promise<ISaved[]> {
    return await SavedModel.find({ user: userId })
      .populate({
        path: "phone",
        populate: { path: "brand", select: "name image" },
      })
      .sort({ createdAt: -1 });
  }

  async isSaved(userId: string, phoneId: string): Promise<boolean> {
    const saved = await SavedModel.findOne({ user: userId, phone: phoneId });
    return saved ? true : false;
  }
}
