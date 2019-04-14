import { Cat } from "src/entity/Cat/Cat";

export default {
  Query: {
    catInfo: async (_, args, { request, isAuthenticated }) => {
      const { uuid } = args;
      const { user } = request;
      isAuthenticated(user);
      return await Cat.findOneOrFail(uuid);
    }
  }
};
