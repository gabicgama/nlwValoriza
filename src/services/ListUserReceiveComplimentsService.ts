import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

class ListUserReceiceComplimentsService {
  async execute(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      user_receiver: user_id,
    });

    return compliments;
  }
}

export { ListUserReceiceComplimentsService };
