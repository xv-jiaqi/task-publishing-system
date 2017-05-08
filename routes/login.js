/**
 * Created by JQ on 2017/5/7.
 *
 * 登录相关路由
 */

// 载入mongoose编译后的模型user
let user = require('../models/users');

module.exports = (app) => {
    // 列出所有用户
    app.get('/user/all', (req, res) => {
        user.fetch((err, users) => {
            if (err) {
                console.log(err);
            }
            res.json(users);
        });
    });

    // 跳转登录
    app.get('/login', (req, res) => {
        res.render('login', {
            title: '任务发布管理系统——登录',
            subtitle: '该任务发布系统支持用户以发布者或执行者发布、领取、执行和分享任务……',
            users: {
                userName: '',
                password: ''
            }
        });
    });

    // 登录ing
    app.post('/login', (req, res) => {
        let userInfo = req.body.users;

        // 登录ing
        if (userInfo) {
            user.findById(userInfo, (err, user) => {
                if (user)
                    res.redirect('/list');
                else {
                    res.render('login', {
                        title: '任务发布管理系统——登录',
                        subtitle: '该任务发布系统支持用户以发布者或执行者发布、领取、执行和分享任务……',
                        users: userInfo,
                        display: 'block!important'
                    });
                }
            });
        }
    });
};