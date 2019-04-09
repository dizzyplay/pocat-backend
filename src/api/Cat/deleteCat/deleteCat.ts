import { EntityManager, Repository } from "typeorm";
import { User } from "../../../entity/User";
import { Cat } from "../../../entity/Cat/Cat";

export default {
  Mutation: {
    deleteCat: async (_, args, { request, isAuthenticated, connection }) => {
      const { user } = request;
      isAuthenticated(user);
      const { catId } = args;
      const manager: EntityManager = connection.manager;
      const cat = await manager.findOne(Cat, catId, { relations: ["user"] });
      if (user.uuid === cat.user.uuid) {
        try {
          await manager.remove(cat);
          return true;
        } catch (e) {
          throw Error(e);
        }
      } else {
        throw Error("You need valid authentication...");
      }
    }
  }
};
