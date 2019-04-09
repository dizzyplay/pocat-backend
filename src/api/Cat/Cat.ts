import { EntityManager } from "node_modules/typeorm";
import { CatWeight } from "src/entity/Cat/CatWeight";

export default {
  Cat: {
    weights: async (parent, _, { connection }) => {
      const manager: EntityManager = connection.manager;
      return await manager.find("CatWeight", {
        where: { cat: parent.uuid },
        order: {
          createdAt: "DESC"
        },
        take: 1
      });
    }
  }
};
