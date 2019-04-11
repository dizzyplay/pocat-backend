import { Raw } from "node_modules/typeorm";
import { CatWeight } from "src/entity/Cat/CatWeight";
import { Cat } from "src/entity/Cat/Cat";

export default {
  Mutation: {
    addCatWeight: async (_, args, { request, isAuthenticated }) => {
      const { catId, weight } = args;
      const { user } = request;
      isAuthenticated(user);
      const cat = await Cat.findOneOrFail(catId, { relations: ["user"] });
      const [exist_record, today] = await CatWeight.findAndCount({
        cat: catId,
        createdAt: Raw(alias => `${alias} >= current_date`)
      });
      try {
        if (user.uuid === cat.user.uuid) {
          if (today > 0) {
            exist_record[0].weight = weight;
            return await exist_record[0].save();
          } else {
            const new_record = new CatWeight();
            new_record.weight = weight;
            new_record.cat = catId;
            return await new_record.save();
          }
        }
      } catch (e) {
        throw Error("Problems occurs while saving data.");
      }
    }
  }
};
