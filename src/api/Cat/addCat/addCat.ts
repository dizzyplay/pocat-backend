import { EntityManager } from "node_modules/typeorm";
import { Cat } from "src/entity/Cat/Cat";

export default {
  Mutation: {
    addCat: async (_, args, { request, isAuthenticated, connection }) => {
      const MALE = "male";
      const FEMALE = "female";
      const { user } = request;
      isAuthenticated(user);
      const { name, gender, kindsId, neutering, pregnant, image, birth } = args;
      const manager: EntityManager = connection.manager;
      const cat = manager.create(Cat, {
        name,
        gender,
        kinds: kindsId,
        neutering,
        pregnant,
        image,
        birth: new Date(birth),
        user: user.uuid
      });
      return manager.save(cat);
    }
  }
};
