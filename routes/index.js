/**
 * Created by JQ on 2017/5/7.
 *
 * 路由入口
 */
module.exports = (app) => {

    // 注册路由
    require('./login')(app);    // 登录路由
    require('./signout')(app);  // 登出
    require('./signup')(app);   // 注册路由
    require('./task')(app);     // 任务相关路由
    require('./resetpwd')(app); // 找回密码

    // index page 首页
    app.get('/', (req, res) => {
        res.redirect('/login');
    });

    // 请求失败，转入请求登录页面
    app.get('/signinerror', (req, res) => {
        res.render('_signinerror', {
            title: '——您还没登录呢！'
        });
    });

    // 请求失败，转入请求登录页面
    app.get('/ready', (req, res) => {
        res.render('_ready', {
            title: '——您已经登录！'
        });
    });

    // 请求失败，非管理员
    app.get('/adminerror', (req, res) => {
        res.render('_adminerror', {
            title: '——你不是管理员！'
        });
    });

    // index page 首页
    app.get('/', (req, res) => {
        res.redirect('/login');
    });
};