/**
 * Created by JQ on 2017/5/8.
 *
 * 任务相关路由
 */

// 载入mongoose编译后的模型
let user = require('../models/users');
let task = require('../models/task');
let _underscore = require('underscore');
let {checkLogin, checkNotLogin, isAdmin} = require('../utils/check');

module.exports = (app) => {
    // 任务列表
    app.get('/list', checkLogin, (req, res) => {
        task.fetch((err, tasks) => {
            if (err) {
                console.log(err);
            }

            if (tasks && tasks.length)
                tasks.map((item) => item.account = item.account && item.account.toFixed(2));

            res.render('taskList', {
                title: '——任务列表',
                subtitle: '此处包含了您和其他所有用户发布的任务，您可以领取他人未被执行的任务，也可以分享所有任务',
                tasks: tasks
            });

        });
    });

    // 删除任务
    app.delete('/list', checkLogin, (req, res) => {
        let id = req.query.id;
        if (id) {
            task.remove({_id: id}, (err, task) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({success: 1});
                }
            });
        }
    });

    // 添加任务
    app.get('/newTask', checkLogin, (req, res) => {
        res.render('newTask', {
            title: '——新任务',
            subtitle: '发布您的任务',
            task: {
                title: '',
                summary: '',
                details: '',
                account: ''
            }
        });
    });

    // 查看、更新任务
    app.get('/update/:id', checkLogin, (req, res) => {
        let id = req.params.id;
        if (id) {
            task.findById(id, (err, task) => {
                res.render('newTask', {
                    title: '任务发布管理系统——详情',
                    subtitle: '只有用户自己发布的任务才拥有修改权限！！！',
                    task: task
                });
            });
        }
    });

    // 后台录入提交
    app.post('/new', checkLogin, (req, res) => {
        let {title, summary, details, account} = req.body.task;
        _task = new task({
            title,
            summary,
            details,
            account
        });
        _task.save((err, task) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/list');
        });
    });
};