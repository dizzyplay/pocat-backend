import { EntityManager } from "node_modules/typeorm";
import { CatWeight } from "../../../entity/Cat/CatWeight";
import { Cat } from "../../../entity/Cat/Cat";

export default {
  Mutation: {
    deleteCatWeight: async (
      _,
      args,
      { request, isAuthenticated, connection }
    ) => {
      const { user } = request;
      isAuthenticated(user);
      const { id } = args;
      const manager: EntityManager = connection.manager;
      const cat_weight = await manager.findOneOrFail(CatWeight, id, {
        relations: ["cat"]
      });
      const cat = await manager.findOneOrFail(Cat, cat_weight.cat.uuid, {
        relations: ["user"]
      });
      if (cat.user.uuid === user.uuid) {
        await manager.remove(cat_weight);
        return true;
      } else {
        throw Error("Invalid authentication.");
      }
    }
  }
};
