import { UserModel, IUser } from "../models/user.model";

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IUser | null>;
  createUser(userData: Partial<IUser>): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
  getCurrentUser(id: string): Promise<IUser | null>;
  updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
  updateUserRating(id: string, average: number, count: number): Promise<void>;
}

export class UserRepository implements IUserRepository {
  async getUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<IUser | null> {
    return await UserModel.findOne({ phoneNumber });
  }

  async updateUser(
    id: string,
    updateData: Partial<IUser>,
  ): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result ? true : false;
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async getCurrentUser(id: string): Promise<IUser | null> {
    return await UserModel.findById(id).select("-password");
  }

  async updateUserRating(
    id: string,
    average: number,
    count: number,
  ): Promise<void> {
    await UserModel.findByIdAndUpdate(id, {
      "rating.average": average,
      "rating.count": count,
    });
  }
}
