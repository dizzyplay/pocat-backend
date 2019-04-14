import { User } from "src/entity/User";
import { checkPassword, generateToken } from "src/utils";

export default {
  Mutation: {
    userLogin: async (_, args) => {
      const { email, password }: { email: string; password: string } = args;
      try {
        const user = await User.findOne({ email });
        const res = await checkPassword(password, user.password);
        if (res) {
          return { token: generateToken(user.uuid) };
        } else return "password is not valid.";
      } catch {
        throw Error("user information wrong");
      }
    }
  }
};
