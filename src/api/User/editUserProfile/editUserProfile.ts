import { EntityManager } from "node_modules/typeorm";
import { User } from "src/entity/User";

export default {
  Mutation: {
    editUserProfile: async (
      _,
      args,
      { request, connection, isAuthenticated }
    ) => {
      const { user } = request;
      isAuthenticated(user);
      const { username } = args;
      const manager: EntityManager = connection.manager;
      const user_obj = await manager.findOne(User, user.uuid);
      user_obj.username = username;
      return manager.save(user_obj);
    }
  }
};
