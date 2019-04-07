import { EntityManager } from "node_modules/typeorm";
import { User } from "src/entity/User";

export default {
  Mutation: {
    confirmSecret: async (_, args, { connection }) => {
      const { email, secret } = args;
      const manager: EntityManager = connection.manager;
      const user = await manager.findOne(User, { email });
      if (user.secretCode === secret) {
        user.activation = true;
        user.secretCode = null;
        await manager.save(user);
        return true;
      }
      return false;
    }
  }
};
