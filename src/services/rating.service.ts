import { RatingRepository } from "../repositories/rating.repository";
import { UserRepository } from "../repositories/user.repository";
import { HttpError } from "../errors/http-error";

const ratingRepository = new RatingRepository();
const userRepository = new UserRepository();

export class RatingService {
  async submitRating(raterId: string, targetId: string, score: number) {
    if (raterId === targetId) {
      throw new HttpError(400, "You cannot rate yourself");
    }

    const targetUser = await userRepository.getUserById(targetId);
    if (!targetUser) {
      throw new HttpError(404, "User not found");
    }

    await ratingRepository.upsertRating(raterId, targetId, score);

    const { average, count } =
      await ratingRepository.getAggregateByTargetId(targetId);
    await userRepository.updateUserRating(targetId, average, count);

    return { average, count };
  }

  async getUserRatings(targetId: string) {
    const targetUser = await userRepository.getUserById(targetId);
    if (!targetUser) {
      throw new HttpError(404, "User not found");
    }

    return await ratingRepository.getRatingsByTargetId(targetId);
  }
}
