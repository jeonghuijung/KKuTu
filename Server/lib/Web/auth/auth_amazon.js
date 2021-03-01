const config = require('../../sub/auth.json');

module.exports.config = {
    strategy: require('passport-amazon').Strategy,
    color: '#FF9900',
    fontcolor: '#FFFFFF',
    vendor: 'amazon',
    displayName: 'withAmazon',
}

module.exports.strategyConfig = {
    clientID: config.amazon.clientID, // 보안을 위해서입니다.
    clientSecret: config.amazon.clientSecret, // 이 방법을 사용하는 것을
    callbackURL: config.amazon.callbackURL, // 적극 권장합니다.
    passReqToCallback: true,
}

module.exports.strategy = (process, MainDB, Ajae) => {
   return (req, accessToken, refreshToken, Profile, done) => {
       const $p = {};

       $p.authType = "amazon";
       $p.id = profile.id;
       $p.name = profile.displayName;
       $p.title = profile.displayName;
       $p.image = profile._json.profile_image;

       process(req, accessToken, MainDB, $p, done);
   }
}
