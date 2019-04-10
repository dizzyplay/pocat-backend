import { CatWeight } from "../../../entity/Cat/CatWeight";
import { isAuthenticated } from "src/utils";

export default {
  Query: {
    catWeightList: async (_, args, { request, connection }) => {
      const { user } = request;
      isAuthenticated(user);
      const { catId, limit } = args;
      const catWeightRepo = connection.getRepository(CatWeight);
      return await catWeightRepo.find({
        where: { cat: catId },
        take: limit ? limit : 5,
        order: { createdAt: "DESC" },
        relations: ["cat"]
      });
    }
  }
};
