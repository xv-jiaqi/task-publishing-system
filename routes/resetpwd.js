/**
 * Created by JQ on 2017/5/7.
 *
 * 注册相关路由
 */

// 载入mongoose编译后的模型user
let User = require('../models/users');
let {checkLogin, checkNotLogin, isAdmin} = require('../utils/check');

module.exports = (app) => {
    // 找回密码
    app.get('/resetpwd/index', checkNotLogin, (req, res) => {
        res.render('pwdIndex', {
            title: '——找回密码  信息校验',
            subtitle: '要重置密码请先提交个人基本信息以便确认身份！'
        });
    });

    // 找回密码——核验信息
    app.post('/resetpwd', checkNotLogin, (req, res) => {
        let {userName, payAccount, gender} = req.body;

        User.find({userName: userName, payAccount: payAccount, gender: gender}, (err, user) => {
            if (err) console.log(err);

            if (user.length) {
                res.redirect(`/resetpwd/${userName}`);
            } else {
                req.flash('error', '信息校验失败！');
                return res.redirect('/resetpwd/index');
            }

        });
    });

    // 重置
    app.get('/resetpwd/:userName', checkNotLogin, (req, res) => {
        let {userName} = req.params;

        res.render('pwdReset', {
            title: '——重置密码',
            subtitle: '重置后请牢记密码！',
            userName
        });
    });

    // 体检密码密码
    app.post('/resetpwd/:userName', checkNotLogin, (req, res) => {

        let {password} = req.body;
        let {userName} = req.params;

        User.findOne({userName}, (err, user) => {
            user.password = password;
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                }

                if (user) {
                    req.flash('success', `修改密码成功，5秒后跳转登陆页面！`);
                    res.redirect(`/resetpwd/${userName}`);
                } else {
                    req.flash('error', '数据插入异常！');
                    res.redirect(`/resetpwd/${userName}`);
                }
            });

        });
    });
};