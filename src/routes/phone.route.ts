import { Router } from "express";
import { PhoneController } from "../controllers/phone.controller";
import { authorizedMiddleware } from "../middleware/authorization.middleware";
import { uploads } from "../middleware/upload.middleware";

const phoneController = new PhoneController();
const router = Router();

router.post(
  "/",
  authorizedMiddleware,
  uploads.single("photo"),
  phoneController.createPhone,
);
router.get("/", phoneController.getAllPhones);
router.get(
  "/my-listings",
  authorizedMiddleware,
  phoneController.getPhonesBySeller,
);
router.get("/near", phoneController.getPhonesNearLocation);
router.get("/brand/:brandId", phoneController.getPhonesByBrand);
router.get("/:id", phoneController.getPhoneById);
router.put(
  "/:id",
  authorizedMiddleware,
  uploads.single("photo"),
  phoneController.updatePhone,
);
router.delete("/:id", authorizedMiddleware, phoneController.deletePhone);

export default router;
