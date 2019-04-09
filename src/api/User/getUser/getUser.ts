import { User } from "src/entity/User";
import { EntityManager } from "node_modules/typeorm";

export default {
  Query: {
    getUser: async (_, args, { request, connection, isAuthenticated }) => {
      const { user } = request;
      isAuthenticated(user);
      const manager: EntityManager = connection.manager;

      return await manager
        .createQueryBuilder(User, "user")
        .where("user.uuid=:id", { id: user.uuid })
        .leftJoinAndSelect("user.cats", "cats")
        .leftJoinAndSelect("cats.feed", "feed")
        .leftJoinAndSelect("cats.kinds", "kinds")
        .getOne();
    }
  }
};
