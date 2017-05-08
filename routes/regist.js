/**
 * Created by JQ on 2017/5/7.
 *
 * 注册相关路由
 */

// 载入mongoose编译后的模型user
let user = require('../models/users');

module.exports = (app) => {
    // 注册页面
    app.get('/register', (req, res) => {
        res.render('register', {
            title: '任务发布管理系统——注册',
            subtitle: '注册用户可用于发布和领取任务，佣金账户用于支付或收取佣金',
            users: {
                userName: '',
                password: '',
                crmPassword: '',
                payAccount: ''
            }
        });
    });

    // 提交注册用户信息
    app.post('/register/new', (req, res) => {
        let usersObj = req.body.users;
        _user = new user({
            userName: usersObj.userName,
            password: usersObj.password,
            payAccount: usersObj.payAccount
        });
        _user.save((err, user) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/login');
        });
    });
};