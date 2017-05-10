let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let SALT_WORK_FACTOR = 10;
let usersSchema = new mongoose.Schema({
    // userId: String,
    userName: {
        uniqe: true,
        type: String
    },   // 用户名
    password: String,   // 密码
    payAccount: String, // 收款账号
    age: {
        type: Number,
        min: 1,
        max: 200
    },
    admin: {
        type: String,
        enum: ['Y','N'],
        default: 'N'
    },      // 是否为管理员
    meta: {
        createAt: {     // 创建时间
            type: Date,
            default: Date.now()
        },
        updateAt: {     // 更新时间
            type: Date,
            default: Date.now()
        }
    }
});

// 注册保存方法, 每次存储数据之前都调用
usersSchema.pre('save', (next) => {
    let user = this;
    // 创建修改时间
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    // 密码加盐 异步用法
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// 密码比较
usersSchema.methods = {
    comparePassword: (_password, callback) => {
        bcrypt.compare(_password, this.password, (err, isMatch) => {
            if (err) return callback(err);

            callback(null, isMatch);
        });
    }
};

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

