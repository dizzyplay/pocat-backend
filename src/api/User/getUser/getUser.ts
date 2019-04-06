import { User } from "src/entity/User";
import { EntityManager } from "node_modules/typeorm";

export default {
  Query: {
    getUser: async (_, args, { request, connection, isAuthenticated }) => {
      const { user } = request;
      isAuthenticated(user);
      const manager: EntityManager = connection.manager;
      return await manager.findOne(User, { uuid: user.uuid });
    }
  }
};
