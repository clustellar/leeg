var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
;

module.exports = function (app, opts) {
  var self = this;
  
  if (!opts.clientID || !opts.clientSecret || !opts.success || typeof opts.success !== 'function') {
    throw new Error('Invalid Arguments: clientID, clientSecret, and a success function are required arguments!', opts);
  }
  
  self.clientID = opts.clientID;
  self.clientSecret = opts.clientSecret;
  self.success = opts.success; // function (accessToken, refreshToken, profile, done) { done() }
  self.scope = opts.scope || ['https://www.googleapis.com/auth/plus.login'];
  self.loginURL = opts.loginURL || '/auth/google';
  self.callbackURL = opts.callbackURL || 'http://localhost:8080/auth/google/callback';
  self.successRedirect = opts.successRedirect || '/';
  self.failureRedirect = opts.failureRedirect || '/login';

  passport.use(new GoogleStrategy({ clientID: self.clientID, clientSecret: self.clientSecret, callbackURL: self.callbackURL }, self.success));

  app.get(self.loginURL, passport.authenticate('google', { scope: self.scope }));
  app.get(self.callbackURL, passport.authenticate('google', { failureRedirect: self.failureRedirect }), function (req, res) {
    res.redirect(self.successRedirect);
  }) 
}
