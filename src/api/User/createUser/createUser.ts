import { EntityManager } from "typeorm";
import { User } from "src/entity/User";
import { generateSecret, sendSecretMail } from "src/utils";

export default {
  Mutation: {
    createUser: async (_, args, { connection }) => {
      const { email } = args;

      try {
        const secret = generateSecret();
        const user = User.create({ email, secretCode: secret });
        await sendSecretMail(email, secret);
        await User.save(user);
        return true;
      } catch {
        throw Error("해당 이메일은 사용할 수 없습니다.");
      }
    }
  }
};
