import { User } from "src/entity/User";
import { createQueryBuilder, EntityManager } from "node_modules/typeorm";
import { CatWeight } from "src/entity/Cat/CatWeight";
import { Cat } from "src/entity/Cat/Cat";

export default {
  Query: {
    getUser: async (_, args, { request, connection, isAuthenticated }) => {
      const { user } = request;
      isAuthenticated(user);
      const manager: EntityManager = connection.manager;
      const users = await manager
        .createQueryBuilder(User, "user")
        .where("user.uuid=:id", { id: user.uuid })
        .leftJoinAndSelect("user.cats", "cats")
        .leftJoinAndSelect("cats.weights", "weight")
        .leftJoinAndSelect("cats.feed", "feed")
        .leftJoinAndSelect("cats.kinds", "kinds")
        .orderBy({ "weight.createdAt": "DESC" })
        .getOne();
      return users;
    }
  }
};
