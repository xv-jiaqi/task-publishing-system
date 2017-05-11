/**
 * Created by JQ on 2017/5/7.
 *
 * 登录相关路由
 */

// 载入mongoose编译后的模型user
let User = require('../models/users');
let {checkLogin, checkNotLogin, isAdmin} = require('../utils/check');

module.exports = (app) => {
    // 跳转登录
    app.get('/login', checkNotLogin, (req, res) => {
        res.render('login', {
            title: '——登录',
            subtitle: '该任务发布系统支持用户以发布者或执行者发布、领取、执行和分享任务……'
        });
    });

    // 登录ing
    app.post('/login', checkNotLogin, (req, res) => {

        let {userName, password} = req.body;

        // 登录ing
        User.findOne({userName: userName}, (err, user) => {
            if (user === null) {
                req.flash('error', '用户名不存在！');
                return res.redirect('/login');
            } else {
                user.comparePassword(password, function(err, isMatch) {
                    if(err) {console.log(err);}

                    if(isMatch) {
                        // 将用户信息挂载到session
                        req.session.user = user;
                        return res.redirect('/list');
                    }else{
                        req.flash('error', '密码错误！');
                        return res.redirect('/login');
                    }
                });
            }
        });
    });

    // 列出所有用户
    app.get('/user/all', checkLogin, isAdmin, (req, res) => {
        User.fetch((err, users) => {
            if (err) {
                console.log(err);
            }
            res.json(users);
        });
    });
};