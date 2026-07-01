import { SavedRepository } from "../repositories/saved.repository";
import { HttpError } from "../errors/http-error";

const savedRepository = new SavedRepository();

export class SavedService {
  async toggleSave(userId: string, phoneId: string) {
    const alreadySaved = await savedRepository.isSaved(userId, phoneId);

    if (alreadySaved) {
      await savedRepository.unsave(userId, phoneId);
      return { saved: false, message: "Listing removed from saved" };
    } else {
      await savedRepository.save(userId, phoneId);
      return { saved: true, message: "Listing saved successfully" };
    }
  }

  async getSavedByUser(userId: string) {
    return await savedRepository.getSavedByUser(userId);
  }

  async isSaved(userId: string, phoneId: string) {
    return await savedRepository.isSaved(userId, phoneId);
  }
}
