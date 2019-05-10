import {CatFeed} from 'src/entity/Cat/CatFeed';

export default {
  Query: {
    catFeedsList: async (_, __, request) => {
      return CatFeed.find();
    },
  },
};
