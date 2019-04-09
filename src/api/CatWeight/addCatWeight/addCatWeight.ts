import { EntityManager } from "node_modules/typeorm";
import { CatWeight } from "../../../entity/Cat/CatWeight";
import { Cat } from "../../../entity/Cat/Cat";

export default {
  Mutation: {
    addCatWeight: async (_, args, { request, isAuthenticated, connection }) => {
      const { catId, weight } = args;
      const { user } = request;
      isAuthenticated(user);
      const manager: EntityManager = connection.manager;
      const cat = await manager.findOneOrFail(Cat, catId, {
        relations: ["user"]
      });
      try {
        if (cat.user.uuid === user.uuid) {
          const cat_weight = manager.create(CatWeight, { weight, cat: catId });
          return manager.save(cat_weight);
        }
      } catch (e) {
        throw Error("Problems occur while saving data");
      }
    }
  }
};
