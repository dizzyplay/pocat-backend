import { EntityManager } from "typeorm";
import { CatWeight } from "../../../entity/Cat/CatWeight";
import { Cat } from "src/entity/Cat/Cat";

export default {
  Mutation: {
    editCatWeight: async (
      _,
      args,
      { request, connection, isAuthenticated }
    ) => {
      const { user } = request;
      isAuthenticated(user);
      const { catId, weightId, weight } = args;
      const manager: EntityManager = connection.manager;
      const cat = await manager.findOneOrFail(Cat, catId, {
        relations: ["user"]
      });
      try {
        if (user.uuid === cat.user.uuid) {
          const cat_weight = await manager.findOneOrFail(CatWeight, weightId, {
            relations: ["cat"]
          });
          if (cat_weight.cat.uuid === cat.uuid) {
            cat_weight.weight = weight;
            return await manager.save(cat_weight);
          }
        }
      } catch (e) {
        throw Error(e);
      }
    }
  }
};
