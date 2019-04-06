import { EntityManager } from "typeorm";
import { User } from "src/entity/User";
import { generateSecret, sendSecretMail } from "src/utils";

export default {
  Mutation: {
    createUser: async (_, args, { connection }) => {
      const { email } = args;
      const manager: EntityManager = connection.manager;
      const secret = generateSecret();
      let user = manager.create(User, { email, secretCode: secret });
      await sendSecretMail(email, secret);
      return (user = await manager.save(user));
    }
  }
};
