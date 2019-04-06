import { User } from "src/entity/User";
import { EntityManager } from "node_modules/typeorm";

export default {
  Query: {
    getUser: async (_, args, { connection }) => {
      const { id } = args;
      const manager: EntityManager = connection.manager;
      return await manager.findOne(User, id);
    }
  }
};
