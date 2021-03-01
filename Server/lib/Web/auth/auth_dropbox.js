const config = require('../../sub/auth.json');

module.exports.config = {
    strategy: require('passport-dropbox').Strategy
    color: '#FFFFFF',
    fontColor: '#FFFFF',
    vendor: 'dropbox',
    displayName: 'withDropbox'
}
module.exports.strategyConfig = {
    clientID: config.dropbox.clientID, // 보안을 위해서입니다.
    clientSecret: config.dropbox.clientDecret, // 이 방법을 사용하는 것을
    callbackURL: config.dropbox.callbackURL, // 적극 권장합니다.
    passReqToCallback: true
}

module.exports.strategy = (strategyProcess, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, o, done) => {
                const $p = {};

                $p.authType = "dropbox";
                $p.id = o.id;
                $p.name = o.name;
                $p.title = o.name;
                $p.image = o.profile.image || '';
                $p.exordial = o.profile.text || '';

                strategyProcess(req, accessToken, MainDB, $p, done);
    }
}
