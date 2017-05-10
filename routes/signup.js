/**
 * Created by JQ on 2017/5/7.
 *
 * 注册相关路由
 */

// 载入mongoose编译后的模型user
let User = require('../models/users');

module.exports = (app) => {
    // 注册页面
    app.get('/signup', (req, res) => {
        res.render('signup', {
            title: '——注册',
            subtitle: '注册用户可用于发布和领取任务，佣金账户用于支付或收取佣金'
        });
    });

    // 提交注册用户信息
    app.post('/signup', (req, res) => {
        let user = req.body;
        let {userName, password, payAccount, gender, birth} = req.body;

        let _user = new user({
            userName,
            password,
            payAccount,
            gender,
            birth: new Date();
        });

        _user.save((err, user) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/login');
        });
    });

    // 校验用户名是否已注册
    app.put('/signup', (req, res) => {
        let userName = req.query.userName;
        User.findOne({userName: userName}, (err, user) => {
            if (err) console.log(err);

            if (user) {
                return res.json({success: 1});
            } else {
                return res.json({success: 0});
            }
        });
    });
};