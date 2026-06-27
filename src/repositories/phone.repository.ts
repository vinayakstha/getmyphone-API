import { PhoneModel, IPhone } from "../models/phone.model";

export interface IPhoneRepository {
  createPhone(data: Partial<IPhone>): Promise<IPhone>;
  getPhoneById(id: string): Promise<IPhone | null>;
  getAllPhones(): Promise<IPhone[]>;
  getPhonesBySeller(sellerId: string): Promise<IPhone[]>;
  getPhonesByBrand(brandId: string): Promise<IPhone[]>;
  getPhonesNearLocation(
    lng: number,
    lat: number,
    maxDistance: number,
  ): Promise<IPhone[]>;
  updatePhone(id: string, data: Partial<IPhone>): Promise<IPhone | null>;
  deletePhone(id: string): Promise<boolean>;
}

export class PhoneRepository implements IPhoneRepository {
  async createPhone(data: Partial<IPhone>): Promise<IPhone> {
    const phone = new PhoneModel(data);
    return await phone.save();
  }

  async getPhoneById(id: string): Promise<IPhone | null> {
    return await PhoneModel.findById(id)
      .populate("brand", "name image")
      .populate("seller", "fullName phoneNumber rating");
  }

  async getAllPhones(): Promise<IPhone[]> {
    return await PhoneModel.find()
      .populate("brand", "name image")
      .populate("seller", "fullName phoneNumber rating")
      .sort({ createdAt: -1 });
  }

  async getPhonesBySeller(sellerId: string): Promise<IPhone[]> {
    return await PhoneModel.find({ seller: sellerId })
      .populate("brand", "name image")
      .sort({ createdAt: -1 });
  }

  async getPhonesByBrand(brandId: string): Promise<IPhone[]> {
    return await PhoneModel.find({ brand: brandId })
      .populate("brand", "name image")
      .populate("seller", "fullName phoneNumber rating")
      .sort({ createdAt: -1 });
  }

  async getPhonesNearLocation(
    lng: number,
    lat: number,
    maxDistance: number = 10000, // default 10km in meters
  ): Promise<IPhone[]> {
    return await PhoneModel.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: maxDistance,
        },
      },
    })
      .populate("brand", "name image")
      .populate("seller", "fullName phoneNumber rating");
  }

  async updatePhone(id: string, data: Partial<IPhone>): Promise<IPhone | null> {
    return await PhoneModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePhone(id: string): Promise<boolean> {
    const result = await PhoneModel.findByIdAndDelete(id);
    return result ? true : false;
  }
}
