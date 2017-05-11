/**
 * Created by JQ on 2017/5/11.
 *
 * 登出
 */

let {checkLogin, checkNotLogin, isAdmin} = require('../utils/check');

// signout 登出
module.exports = (app) => {
	app.get('/signout', checkLogin, function(req, res) {
        // 清空 session 中用户信息
        req.session.user = null;
        // 退出成功后返回主页
        res.redirect('/');
    });
};
