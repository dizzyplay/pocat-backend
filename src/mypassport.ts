import * as passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { getManager } from "typeorm";
import { User } from "src/entity/User";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    const entityManager = getManager();
    const user = await entityManager.findOne(User, payload.id);
    if (user !== null) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err);
  }
};

export const authenticationJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
