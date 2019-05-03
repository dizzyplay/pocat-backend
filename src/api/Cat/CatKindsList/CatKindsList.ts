import {CatKinds} from 'src/entity/Cat/CatKinds';

export default {
  Query: {
    catKindsList: async (_, __, {request}) => {
      return CatKinds.find();
    },
  },
};
