const { User } = require('../models/User');

let auth = (req, res, next) => {
    // do authentification
    //step1. get token from client cookie
    let token = req.cookies.x_auth;
    //step2. decrypt token and find user
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                isAuth: false,
                error: true
            });
        }else{
            req.token = token;
            req.user = user;
            next();
        }
    });
}

module.exports = { auth };