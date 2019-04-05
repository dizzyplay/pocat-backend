import { EntityManager } from "typeorm";
import { User } from "../../../entity/User";

export default {
  Mutation: {
    deleteUser: async (_, args, { connection }) => {
      const { id } = args;
      const manager: EntityManager = connection.manager;
      const user = await manager.findOne(User, id);
      if (user) {
        await manager.remove(user);
        return true;
      }
      return false;
    }
  }
};
