let mongoose = require('mongoose');

// 任务表结构
let taskSchema = new mongoose.Schema({
    title: String,
    details: String,
    account: Number,
    owner: String,
    assign: String,
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N'
    },
    share: Array,
    // meta 更新或录入数据的时间记录
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        },
    }
});

// taskSchema.pre 表示每次存储数据之前都先调用这个方法
taskSchema.pre('save', function (next)  {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

// taskSchema 模式的静态方法
taskSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

// 导出movieSchema模式
module.exports = taskSchema;

