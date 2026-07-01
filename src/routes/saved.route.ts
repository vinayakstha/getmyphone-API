import { Router } from "express";
import { SavedController } from "../controllers/saved.controller";
import { authorizedMiddleware } from "../middleware/authorization.middleware";

const savedController = new SavedController();
const router = Router();

router.post("/:phoneId", authorizedMiddleware, savedController.toggleSave);
router.get("/", authorizedMiddleware, savedController.getSavedByUser);
router.get("/:phoneId/is-saved", authorizedMiddleware, savedController.isSaved);

export default router;
