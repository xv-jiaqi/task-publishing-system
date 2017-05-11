module.exports = {
    // 登陆监测
    checkLogin: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/signinerror');
        }
        next();
    },

    // 退出状态
    checkNotLogin: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/ready');
        }
        next();
    },

    // 角色判断
    isAdmin: (req, res, next) => {
        let _user = req.session.user;
        let _isAdmin = _user.admin;
        if (_isAdmin === 'N') {
            return res.redirect('/adminerror');
        }
        next();
    }
};