import { EntityManager } from "typeorm";
import { Cat } from "src/entity/Cat/Cat";

export default {
  Query: {
    myCatList: async (_, args, { request, isAuthenticated, connection }) => {
      const { user } = request;
      isAuthenticated(user);
      const manager: EntityManager = connection.manager;
      return await manager.find(Cat, {
        where: { user: user.uuid },
        relations: ["kinds", "feed"]
      });
    }
  }
};
