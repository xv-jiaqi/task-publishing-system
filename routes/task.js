/**
 * Created by JQ on 2017/5/8.
 *
 * 任务相关路由
 */

// 载入mongoose编译后的模型
let user = require('../models/users');
let task = require('../models/task');
let _underscore = require('underscore');

module.exports = (app) => {
    // 任务列表
    app.get('/list', (req, res) => {
        task.fetch((err, tasks) => {
            if (err) {
                console.log(err);
            }

            if (tasks && tasks.length)
                tasks.map((item) => item.account = item.account && item.account.toFixed(2));

            res.render('taskList', {
                title: '任务发布管理系统——任务列表',
                tasks: tasks
            });

        });
    });

    // 删除任务
    app.delete('/list', (req, res) => {
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
    app.get('/newTask', (req, res) => {
        res.render('newTask', {
            title: '任务发布管理系统——新任务',
            subtitle: '发布任务及相关信息',
            task: {
                title: '',
                summary: '',
                details: '',
                account: ''
            }
        });
    });

    // 查看、更新任务
    app.get('/update/:id', (req, res) => {
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
    app.post('/new', (req, res) => {
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