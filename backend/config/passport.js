const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");

// passport-jwt strategy options
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
};

// implement verify callback for passport strategy to find the user whose token is passed
/**
 * Logic to find the user matching the token passed
 * - If payload type isn't `tokenTypes.ACCESS` return an Error() with message, "Invalid token type" in the callback function
 * - Find user object matching the decoded jwt token
 * - If there's a valid user, return the user in the callback function
 * - If user not found, return `false` in the user field in the callback function
 * - If the function errs, return the error in the callback function
 *
 * @param payload - the payload the token was generated with
 * @param done - callback function
 */
const jwtVerify = async (payload, done) => {
  try {
    if(payload.type===tokenTypes.ACCESS){
      const user=await User.findByPk(payload.sub)
      if(user.dataValues){
        done(null,user.dataValues)
      }
      done(null,false)
    }else{
      done(new Error('Envalid Token Type'),false)
    }
  } catch (error) {
    done(error,false)
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
