# 任务发布系统

--- 

[TOC]

---

## 任务描述

设计一个任务发布系统,画出流程图,写出数据库设计,并实现代码
1. 支持登陆注册,用户分为两类,发布者和执行者
1. 支持任务发布,任务领取,任务执行,任务分享
1. 发布任务需要支付佣金,完成任务可以获得佣金
1. 可以将领取的任务分享到朋友圈或微信好友
1. C执行了B分享(A创建)的任务,C能获取90%的佣金,B获取10%的佣金
1. 上述B可以是多人,多人共享10%佣金


## 仓库地址

[github.com/kkxujq/task-publishing-system](https://github.com/kkxujq/task-publishing-system)

## 目录结构

```md
│  .bowerrc
│  .gitignore
│  app.js               // 入口
│  bower.json
│  config.js
│  package.json
│  README.md      
├─models                // 数据库模型
│      task.js
│      users.js    
├─node_modules          // 项目依赖
│  ├─...          
├─public
│  ├─js                 // 页面js文件
│  │      countDown.js
│  │      error.js
│  │      taskDel.js
│  │      ucShare.js
│  │      validation.js     
│  └─libs               // 静态资源
│      ├─task.css
│      ├─bootstrap         
│      └─jquery                     
├─routes                // 路由
│      index.js             // 路由入口
│      login.js
│      resetpwd.js
│      signout.js
│      signup.js
│      task.js     
├─schemas               // Schema模式
│      task.js
│      users.js      
├─utils                 // 工具
│      check.js             // 状态监测
└─views                 // 视图
    ├─layout.jade
    │  
    ├─includes
    │      head.jade
    │      header.jade  
    └─pages
            login.jade
            newTask.jade
            pwdIndex.jade
            pwdReset.jade
            signup.jade
            taskList.jade
            updateTask.jade
            _404.jade
            _adminError.jade
            _ready.jade
            _signinError.jade
```

## 流程图

![用户相关](http://oe8r161mt.bkt.clouddn.com/taskSystem/user.png?imageView/2/w/500/q/100)
<br>
![任务流程](http://oe8r161mt.bkt.clouddn.com/taskSystem/task.png?imageView/2/w/500/q/100)


## 数据库设计

![数据库设计](http://oe8r161mt.bkt.clouddn.com/taskSystem/DBs.png?imageView/2/w/500/q/100)


## 开发流程

> - 5/4-5/6，(周四-周六) 分析系统设计，简化流程草图和数据库设计，技术选型
> - 5/7-5/8，(周日-周一) 系统架构，开撸代码<br>

## 技术栈

**node.js**、**mongoDB**、express、**jade**


## 项目启动流程

### 1、 安装`Node.js`
### 2、 安装`MongoDB`
 - 2.1、 把`MongoDB`安装路径下的`bin`文件目录添加到系统环境变量；
 - 2.2、 设置MongoDB数据库的数据存储路径。

### 3、 启动`MongoDB`服务：`mongod`
 - 3.1、 执行命令：`mongod`，开启`MongoDB`服务;
 - 3.2、 执行命令：`mongo`，可对数据库进行**CRUD**操作。

### 4、 安装`npm`依赖：`npm install`
### 5、 安装`bower`依赖：`bower install`
### 6、 启动项目入口文件：`node app.js`
### 7、 浏览器查看效果
 路由可查看`routes\index.js`下具体定义，入口路由`http://localhost:8888`。
 

## 参考

> - [Jade - 模板引擎](http://expressjs.jser.us/jade.html)
> - [http://mongoosejs.com/docs](https://github.com/Automattic/mongoose)
> - [http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)
> - [nodejs中的bcryptjs密码加密](https://segmentfault.com/a/1190000008841988)
> - [结合express-session中间件理解Session和cookie的概念](http://www.imooc.com/article/14459)
> - [SESSION原理、安全以及最基本的EXPRESS和REDIS实现](http://hao.jser.com/archive/4968/)
> - [task360](http://www.task360.net/)
> - [node+mongodb 建站攻略（一期）](http://www.imooc.com/learn/75)
> - [yudaren007007/Y-douban](https://github.com/yudaren007007/Y-douban)




