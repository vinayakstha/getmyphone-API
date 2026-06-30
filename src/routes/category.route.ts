import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authorizedMiddleware } from "../middleware/authorization.middleware";
import { uploads } from "../middleware/upload.middleware";

const categoryController = new CategoryController();
const router = Router();

router.post(
  "/",
  authorizedMiddleware,
  uploads.category.single("image"),
  categoryController.createCategory,
);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put(
  "/:id",
  authorizedMiddleware,
  uploads.category.single("image"),
  categoryController.updateCategory,
);
router.delete("/:id", authorizedMiddleware, categoryController.deleteCategory);

export default router;
