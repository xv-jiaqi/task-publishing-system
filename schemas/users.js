let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let SALT_WORK_FACTOR = 10;

let usersSchema = new mongoose.Schema({
    userName: {         // 用户名
        uniqe: true,
        type: String
    },
    password: String,   // 密码
    payAccount: String, // 收款账号
    birth: Date,
    gender: {
        type: String,
        enum: ['m', 'f', 'x']
    },
    admin: {
        type: String,
        enum: ['Y', 'N'],
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
usersSchema.pre('save', function (next) {
    let user = this;
    // 创建修改时间
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    // 密码加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// 密码比较
usersSchema.methods = {
    comparePassword: function (_password, callback) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
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
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = usersSchema;

