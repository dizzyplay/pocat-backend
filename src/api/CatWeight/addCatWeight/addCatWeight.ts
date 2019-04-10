import { EntityManager } from "node_modules/typeorm";
import { CatWeight } from "../../../entity/Cat/CatWeight";
import { Cat } from "../../../entity/Cat/Cat";

export default {
  Mutation: {
    addCatWeight: async (_, args, { request, isAuthenticated, connection }) => {
      const { catId, weight } = args;
      const { user } = request;
      isAuthenticated(user);
      const manager: EntityManager = connection.manager;
      const cat = await manager.findOneOrFail(Cat, catId, {
        relations: ["user"]
      });
      try {
        if (cat.user.uuid === user.uuid) {
          const cat_weight_last = await manager.find(CatWeight, {
            where: { cat: catId },
            order: { id: "DESC" },
            take: 1
          });
          const last_one = cat_weight_last[0];
          const today_ts = Number(new Date(makeToday()).getTime());
          const last_ts = Number(
            new Date(last_one.createdAt).getTime() + 1000 * 60 * 540
            //db는 UTC 타임으로 저장되므로 9시간을 더해준다.
          );
          if (today_ts - last_ts > 0) {
            //오늘 기록이 없는경우
            const cat_weight = manager.create(CatWeight, {
              weight,
              cat: catId
            });
            return manager.save(cat_weight);
          } else {
            //오늘 기록이 있는 경우
            last_one.weight = weight;
            return manager.save(last_one);
          }
        }
      } catch (e) {
        throw Error("Problems occur while saving data");
      }
    }
  }
};

function makeToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = [];
  today.push(year);
  today.push(month < 10 ? "0" + month : month);
  today.push(day < 10 ? "0" + day : day);
  return today.join("-");
}
