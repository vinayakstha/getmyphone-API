import z from "zod";
import { Request, Response } from "express";
import { CreatePhoneDTO, UpdatePhoneDTO } from "../dtos/phone.dto";
import { PhoneService } from "../services/phone.service";

const phoneService = new PhoneService();

export class PhoneController {
  async createPhone(req: Request, res: Response) {
    try {
      const sellerId = req.user?._id;
      if (!sellerId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const body = {
        ...req.body,
        price: Number(req.body.price),
        location: JSON.parse(req.body.location),
      };

      const parsedData = CreatePhoneDTO.safeParse(body);
      if (!parsedData.success) {
        return res
          .status(400)
          .json({ success: false, message: z.prettifyError(parsedData.error) });
      }

      const photo = req.file ? `/uploads/${req.file.filename}` : undefined;
      const phone = await phoneService.createPhone(
        sellerId,
        parsedData.data,
        photo,
      );

      return res.status(201).json({
        success: true,
        data: phone,
        message: "Phone listing created successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getPhoneById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const phone = await phoneService.getPhoneById(id as string);
      return res.status(200).json({
        success: true,
        data: phone,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getAllPhones(req: Request, res: Response) {
    try {
      const phones = await phoneService.getAllPhones();
      return res.status(200).json({
        success: true,
        data: phones,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getPhonesBySeller(req: Request, res: Response) {
    try {
      const sellerId = req.user?._id;
      if (!sellerId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const phones = await phoneService.getPhonesBySeller(sellerId);
      return res.status(200).json({
        success: true,
        data: phones,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getPhonesByBrand(req: Request, res: Response) {
    try {
      const { brandId } = req.params;
      const phones = await phoneService.getPhonesByBrand(brandId as string);
      return res.status(200).json({
        success: true,
        data: phones,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async getPhonesNearLocation(req: Request, res: Response) {
    try {
      const { lng, lat, maxDistance } = req.query;
      if (!lng || !lat) {
        return res
          .status(400)
          .json({ success: false, message: "lng and lat are required" });
      }
      const phones = await phoneService.getPhonesNearLocation(
        Number(lng),
        Number(lat),
        maxDistance ? Number(maxDistance) : undefined,
      );
      return res.status(200).json({
        success: true,
        data: phones,
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async updatePhone(req: Request, res: Response) {
    try {
      const sellerId = req.user?._id;
      if (!sellerId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const { id } = req.params;

      const body = {
        ...req.body,
        ...(req.body.price && { price: Number(req.body.price) }),
        ...(req.body.location && { location: JSON.parse(req.body.location) }),
      };

      const parsedData = UpdatePhoneDTO.safeParse(body);
      if (!parsedData.success) {
        return res
          .status(400)
          .json({ success: false, message: z.prettifyError(parsedData.error) });
      }

      const photo = req.file ? `/uploads/${req.file.filename}` : undefined;
      const updatedPhone = await phoneService.updatePhone(
        id as string,
        sellerId,
        parsedData.data,
        photo,
      );

      return res.status(200).json({
        success: true,
        data: updatedPhone,
        message: "Phone listing updated successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async deletePhone(req: Request, res: Response) {
    try {
      const sellerId = req.user?._id;
      if (!sellerId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const { id } = req.params;
      await phoneService.deletePhone(id as string, sellerId);
      return res.status(200).json({
        success: true,
        message: "Phone listing deleted successfully",
      });
    } catch (error: Error | any) {
      return res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
