const config = require('../../sub/auth.json');

module.exports.config = {
    strategy: require('passport-모듈이름').Strategy, // '모듈이름'에는 모듈의 이름 (ex: naver)를 집어넣는다.
    color: '#000000', // example: #설치할 모듈의 사이트와 비슷한 색상으로
    fontColor: '#FFFFFF',
    vendor: '', // example: 모듈 이름 (ex: naver)
    displayName: 'withName'// Name 에는 모듈의 이름을 넣고, ko_KR.json에 이름을 알맞게 넣는다

}

module.exports.strategyConfig = { // example: naver
    clientID: config.naver.clientID, // 보안을 위해서입니다.
    clientSecret: config.naver.clientSecret, // 이 방법을 사용하는 것을
    callbackURL: config.naver.callbackURL, // 적극 권장합니다.
    passReqToCallback: true /*,
    profileFields: ['id' ,'name' , 'gender', 'age_range', 'displayName'], -> require facebook
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/plus.login'], -> require google */
}

module.exports.strategy = (process, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, profile, done) => {
        const $p = {};

        $p.authType = "naver";
        $p.id = profile.id;
        $p.name = profile.displayName;
        $p.title = profile.displayName;
        $p.image = profile._json.profile_image;
        
        /* 망할 셧다운제
        $p._age = profile._json.age.split('-').map(Number);
        $p._age = { min: ($p._age[0] || 0) - 1, max: $p._age[1] - 1 };
        $p.birth = profile._json.birthday.split('-').map(Number);
        if(MONTH < $p.birth[0] || (MONTH == $p.birth[0] && DATE < $p.birth[1])){
            $p._age.min--;
            $p._age.max--;
        }
        $p.isAjae = Ajae($p.birth, $p._age);
        */
        // $p.sex = profile[0].gender[0];

        process(req, accessToken, MainDB, $p, done);
    } // example naver
}
