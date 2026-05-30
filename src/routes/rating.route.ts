import { Router } from "express";
import { RatingController } from "../controllers/rating.controller";
import { authorizedMiddleware } from "../middleware/authorization.middleware";

const ratingController = new RatingController();
const router = Router();

router.post("/", authorizedMiddleware, ratingController.submitRating);
router.get("/:targetId", authorizedMiddleware, ratingController.getUserRatings);

export default router;
