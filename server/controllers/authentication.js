const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub(ject) and i(ssue)a(t)t(ime)
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password.'})
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {

    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send( { error: 'An account with this email has already been registered.'});
    }

    // If a user with email does not exist, create and save user record
    const newUser = new User({
      email: email,
      password: password
    })

    newUser.save(function(err) {
      if (err) {
        return next(err)
      }

      // Respond to request indicating user was created
      res.json({ token: tokenForUser(newUser) });

    });
  })
};

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We need to give user a token
  res.send({ token: tokenForUser(req.user) });

}
