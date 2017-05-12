/**
 * Created by JQ on 2017/5/8.
 *
 * 任务相关路由
 */

// 载入mongoose编译后的模型
let Task = require('../models/task');
let _underscore = require('underscore');
let {checkLogin, checkNotLogin, isAdmin} = require('../utils/check');

module.exports = (app) => {
    // 任务列表
    app.get('/list', checkLogin, (req, res) => {
        Task.fetch((err, tasks) => {
            if (err) console.log(err);

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
            Task.remove({_id: id}, (err, task) => {
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
            subtitle: '发布您的任务'
        });
    });

    // 查看、更新任务
    app.get('/update/:id', checkLogin, (req, res) => {
        let id = req.params.id;
        Task.findById(id, (err, task) => {
            res.render('updateTask', {
                title: '——详情',
                subtitle: '可领取他人的任务（只有发布者自己的任务才可以修改）！！！',
                task: task
            });
        });
    });

    // 提交更新
    app.post('/update/:id', checkLogin, (req, res) => {

        let {title, details, account} = req.body.task || {};
        let id = req.params.id;
        let user = req.session.user;
        let prompt = {};

        Task.findById(id, (err, task) => {

            let _task = null;
            if(title && details && account) {
                _task = _underscore.extend(task, {title, details, account});
            } else {
                task.assign = user.userName;
                _task = task;
            }

            _task.save((err, task) => {
                if (err) console.log(err);

                if (task.owner === req.session.user.userName) {
                    prompt.success = '数据更新成功！:)';
                    prompt.error = '数据更新失败 :(';
                } else {
                    prompt.success = '任务领取成功！:)';
                    prompt.error = '任务领取失败 :(';
                }

                if (task) {
                    req.flash('success', prompt.success);
                    res.redirect(`/update/${id}`);
                } else {
                    req.flash('error', prompt.error);
                    res.redirect(`/update/${id}`);
                }
            });
        });
    });

    // 后台录入提交
    app.post('/new', checkLogin, (req, res) => {
        let {title, details, account} = req.body.task;

        _task = new Task({
            title,
            details,
            account,
            owner: req.session.user.userName
        });

        _task.save((err, task) => {
            if (err) console.log(err);

            res.redirect('/list');
        });
    });
};