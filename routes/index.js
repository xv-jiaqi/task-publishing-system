/**
 * Created by JQ on 2017/5/7.
 *
 * 路由入口
 */
module.exports = (app) => {

    require('./login')(app);    // 登录路由
    require('./regist')(app);   // 注册路由
    require('./task')(app);     // 任务相关路由

    // index page 首页
    app.get('/', (req, res) => {
        res.redirect('/login');
    });

    // 404
    app.get('*', (req, res) => {
        console.error("Page Not Found：" + req.originalUrl);
        res.status(404).render('_404', {
            title: 'No Found'
        })
    });
};