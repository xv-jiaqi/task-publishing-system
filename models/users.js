let mongoose = require('mongoose');
let usersSchema = require('../schemas/users'); //引入'../schemas/movie.js'导出的模式模块

// 编译生成movie模型
let users = mongoose.model('users', usersSchema);

// 将movie模型[构造函数]导出
module.exports = users;