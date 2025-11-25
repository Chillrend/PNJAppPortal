const OpenIDConnectStrategy = require('passport-openidconnect').Strategy;
const { User } = require('../models/App'); // We might need a User model later, for now just serialize/deserialize

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use('oidc', new OpenIDConnectStrategy({
        issuer: process.env.OIDC_ISSUER,
        authorizationURL: process.env.OIDC_AUTH_URL,
        tokenURL: process.env.OIDC_TOKEN_URL,
        userInfoURL: process.env.OIDC_USERINFO_URL,
        clientID: process.env.OIDC_CLIENT_ID,
        clientSecret: process.env.OIDC_CLIENT_SECRET,
        callbackURL: process.env.OIDC_CALLBACK_URL || 'http://localhost:3000/auth/callback',
        scope: 'openid profile email'
    },
        (issuer, sub, profile, accessToken, refreshToken, done) => {
            // Here you would typically save the user to your DB
            // For now, we just pass the profile through
            return done(null, profile);
        }
    ));
};
