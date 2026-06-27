import { CreatePhoneDTO, UpdatePhoneDTO } from "../dtos/phone.dto";
import { PhoneRepository } from "../repositories/phone.repository";
import { HttpError } from "../errors/http-error";
import mongoose from "mongoose";

const phoneRepository = new PhoneRepository();

export class PhoneService {
  async createPhone(sellerId: string, data: CreatePhoneDTO, photo?: string) {
    const phoneData = {
      ...data,
      brand: new mongoose.Types.ObjectId(data.brand),
      seller: new mongoose.Types.ObjectId(sellerId),
      photo: photo ?? undefined,
    };
    const phone = await phoneRepository.createPhone(phoneData);
    return phone;
  }

  async getPhoneById(id: string) {
    const phone = await phoneRepository.getPhoneById(id);
    if (!phone) {
      throw new HttpError(404, "Phone listing not found");
    }
    return phone;
  }

  async getAllPhones() {
    return await phoneRepository.getAllPhones();
  }

  async getPhonesBySeller(sellerId: string) {
    return await phoneRepository.getPhonesBySeller(sellerId);
  }

  async getPhonesByBrand(brandId: string) {
    return await phoneRepository.getPhonesByBrand(brandId);
  }

  async getPhonesNearLocation(lng: number, lat: number, maxDistance?: number) {
    return await phoneRepository.getPhonesNearLocation(lng, lat, maxDistance);
  }

  async updatePhone(
    id: string,
    sellerId: string,
    data: UpdatePhoneDTO,
    photo?: string,
  ) {
    const phone = await phoneRepository.getPhoneById(id);
    if (!phone) {
      throw new HttpError(404, "Phone listing not found");
    }

    if (phone.seller.toString() !== sellerId) {
      throw new HttpError(403, "You are not authorized to update this listing");
    }

    const updateData: any = { ...data };
    if (photo) updateData.photo = photo;

    return await phoneRepository.updatePhone(id, updateData);
  }

  async deletePhone(id: string, sellerId: string) {
    const phone = await phoneRepository.getPhoneById(id);
    if (!phone) {
      throw new HttpError(404, "Phone listing not found");
    }

    if (phone.seller.toString() !== sellerId) {
      throw new HttpError(403, "You are not authorized to delete this listing");
    }

    return await phoneRepository.deletePhone(id);
  }
}
