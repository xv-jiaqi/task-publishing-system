let mongoose = require('mongoose');
let taskSchema = require('../schemas/task'); //引入'../schemas/task.js'导出的模式模块

// 编译生成task模型
let task = mongoose.model('task', taskSchema);

// 将task模型[构造函数]导出
module.exports = task;