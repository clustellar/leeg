var express = require('express')
  , passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , User = require('../models/user')
  , handlers = require('./handlers')
  , parser = require('./parser')
  , GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  , GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
  , GOOGLE_CLIENT_SCOPE = process.env.GOOGLE_CLIENT_SCOPE ? process.env.GOOGLE_CLIENT_SCOPE.split(' ') : ['profile email']
  , APP_REDIRECT_URL = process.env.APP_REDIRECT_URL || '/'
;

passport.use(new GoogleStrategy({ clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, callbackURL: '/auth/google/callback' }, function (accessToken, refreshToken, profile, done) {
  var attrs = {
    displayName: profile.displayName,
    email: parser.google.email(profile),
    gender: profile.gender,
    photo: parser.google.photo(profile)
//    oauthAccessToken: accessToken, // dont need to store these tokens since just authenticating
//    oauthRefreshToken: refreshToken
  };
  User.findOrCreate(profile.id, attrs).then(function (user) {
    done(null, user)
  }).catch(function (err) {
    done(err);
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('USER BY ID: ', id);
  User.get(id).then(function(user) {
    done(null, user);
  }).catch(function (err) {
    done(err);
  })
});

module.exports = function (app) {
  console.log('registering google strategy...')
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.get('/auth/google', passport.authenticate('google', { scope: GOOGLE_CLIENT_SCOPE }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect(APP_REDIRECT_URL);
  });
}
