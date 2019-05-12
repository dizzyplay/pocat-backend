import {Cat} from 'src/entity/Cat/Cat';
import {CatWeight} from 'src/entity/Cat/CatWeight';

export default {
  Mutation: {
    addBodyInfo: async (_, args, {request, isAuthenticated}) => {
      const {uuid, catFeedsId, ribcage, weight, lim} = args;
      const {user} = request;
      isAuthenticated(user);
      try {
        const cat = await Cat.findOneOrFail({where: {uuid}});
        cat.ribcage = Number(ribcage);
        cat.LIM = Number(lim);
        cat.feed = catFeedsId;
        cat.save();
        const new_weight = new CatWeight();
        new_weight.cat = uuid;
        new_weight.weight = weight;
        new_weight.save();
      } catch {
        throw Error('Problems occur while saving data');
      }
    },
  },
};
