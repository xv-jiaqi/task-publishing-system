let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    password: String,
    payAccount: String
});

// usersSchema 模式的静态方法
usersSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (obj, cb) {
        return this
            .findOne(obj)
            .exec(cb)
    }
};

// 导出movieSchema模式
module.exports = usersSchema;

