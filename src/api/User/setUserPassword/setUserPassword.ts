import { EntityManager } from "node_modules/typeorm";
import { User } from "src/entity/User";
import { genHash } from "src/utils";

export default {
  Mutation: {
    setUserPassword: async (_, args, { connection }) => {
      const { id, password } = args;
      const manager: EntityManager = connection.manager;
      const user = await manager.findOne(User, id);
      if (user.status === true && user.password === null) {
        genHash(password).then(async (hash: string) => {
          user.password = hash;
          await manager.save(user);
          return true;
        });
        return true;
      } else return false; // email인증이 되어있지 않음
    }
  }
};
