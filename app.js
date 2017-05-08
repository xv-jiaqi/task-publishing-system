let express = require('express');   // 加载express模块
let mongoose = require('mongoose'); // 加载mongoose模块
let path = require('path');         // 引入path模块的作用：因为页面样式的路径放在了bower_components，告诉express，请求页面里所过来的请求中，如果有请求样式或脚本，都让他们去bower_components中去查找
let app = express();
let routes = require('./routes');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let config = require('./config');

app.listen(config.port);                // 监听端口
console.log(`start on port ${config.port}`);

mongoose.connect(config.mongodb);       // 连接mongodb本地数据库
console.log('MongoDB connection success!');

app.locals.moment = require('moment');  // 载入moment模块，格式化日期

app.use(require('serve-static')('public')); // 静态文件处理 路径：public

app.set('views', './views/pages');      // 设置视图默认的文件路径
app.set('view engine', 'jade');         // 设置视图引擎：jade

// 注册路由
routes(app);

// session 中间件
app.use(session({
    name: config.session.key,           // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,      // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: false,                      // 设置指每次请求不再重新设置session cookie
    saveUninitialized: true,            // 设置指无论有没有session cookie，每次请求都设置个session cookie
    cookie: {
        maxAge: config.session.maxAge   // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({             // 将 session 存储到 mongodb
        url: config.mongodb
    })
}));

app.use((req, res, next) => {
    if (!req.session) {
        return next(new Error('session异常'));
    } else {
        req.session.userInfo = {};             // 这里挂载用户相关信息
    }

    next();
});

let bodyParser = require('body-parser');
// 因为后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
app.use(bodyParser.urlencoded({extended: true}));
