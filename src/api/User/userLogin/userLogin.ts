import { EntityManager } from "typeorm";
import { User } from "../../../entity/User";
import { checkPassword, generateToken } from "../../../utils";

export default {
  Query: {
    userLogin: async (_, args, { connection }) => {
      const { email, password }: { email: string; password: string } = args;
      const manager: EntityManager = connection.manager;
      try {
        const user = await manager.findOne(User, { email });
        const res = await checkPassword(password, user.password);
        if (res) {
          return generateToken(user.uuid);
        } else return "password is not valid.";
      } catch {
        throw Error("user information wrong");
      }
    }
  }
};
