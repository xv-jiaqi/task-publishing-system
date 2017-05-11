/**
 * Created by JQ on 2017/5/7.
 *
 * 注册相关路由
 */

// 载入mongoose编译后的模型user
let User = require('../models/users');

module.exports = (app) => {
    // 注册页面
    app.get('/resetpwd/index', (req, res) => {
        res.render('pwdIndex', {
            title: '——找回密码  信息校验',
            subtitle: '要重置密码请先提交个人基本信息以便确认身份！'
        });
    });

    // 提交注册用户信息
    app.post('/resetpwd', (req, res) => {
        let {userName, payAccount, gender} = req.body;

        User.find({userName: userName, payAccount: payAccount, gender: gender}, (err, user) => {
            if (err) console.log(err);

            if (user.length) {
                res.redirect(`/resetpwd/reset/${userName}`);
            } else {
                req.flash('error', '信息校验失败！');
                return res.redirect('/resetpwd/index');
            }

        });
    });

    // 重置
    app.get('/resetpwd/reset/:userName', (req, res) => {
        let {userName} = req.params;

        res.render('pwdReset', {
            title: '——重置密码',
            subtitle: '重置后请牢记密码！',
            userName
        });
    });
};