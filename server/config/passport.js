const { Issuer, Strategy } = require('openid-client');

module.exports = async function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    try {
        const issuerUrl = process.env.OIDC_ISSUER;
        console.log(`Discovering OIDC configuration for issuer: ${issuerUrl}`);
        const issuer = await Issuer.discover(issuerUrl);
        console.log('OIDC Configuration discovered successfully');

        const client = new issuer.Client({
            client_id: process.env.OIDC_CLIENT_ID,
            client_secret: process.env.OIDC_CLIENT_SECRET,
            redirect_uris: [process.env.OIDC_CALLBACK_URL || 'http://localhost:3000/auth/callback'],
            response_types: ['code']
        });

        passport.use('oidc', new Strategy({
            client,
            params: {
                scope: 'openid profile email'
            },
            usePKCE: 'S256' // Enable PKCE with S256
        }, async (tokenSet, done) => {
            let userinfo = {};
            try {
                userinfo = await client.userinfo(tokenSet.access_token);
                console.log('UserInfo:', userinfo);
            } catch (e) {
                console.error('Failed to fetch userinfo', e);
            }
            return done(null, userinfo);
        }));
    } catch (error) {
        console.error('Failed to initialize OIDC strategy:', error);
    }
};
