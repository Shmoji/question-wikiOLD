const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const knex = require('../connect');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// I think this is used to check if User is valid user when valid User is needed for that part of website.
// The jwt_payload will be sent via our login route inside users.js route

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {

      // TODO: figure out what is happening here

      knex('_User').select('id')
        .where('id', jwt_payload.id).then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));

    })
  );
};