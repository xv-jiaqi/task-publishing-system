# 任务发布系统

--- 

[TOC]

---

## 任务要求

> 1. 支持登陆注册，用户分为两类,发布者和执行者
> 1. 支持任务发布,任务领取,任务执行,任务分享
> 1. 发布任务需要支付佣金,完成任务可以获得佣金
> 1. 可以将领取的任务分享到朋友圈或微信好友
> 1. C执行了B分享(A创建)的任务,C能获取90%的佣金,B获取10%的佣金
> 1. 上述B可以是多人,多人共享10%佣金


## 流程图

## 数据库设计

## 开发流程

> - 5/4~5/6,(周四~周六) 分析系统设计，简化流程草图和数据库设计，技术选型
> - 5/7~5/8,(周日~周一) 系统架构，开撸代码<br>
> **说明**：由于5/4~5/6号在老家（甘肃·平凉）没带电脑，真正代码书写在5/7号开始。


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
 - 7.1  `http://localhost:3000`查看首页效果；
 - 7.2  `http://localhost:3000/admin/list`列表页；
 - 7.3  `http://localhost:3000/admin/movie`后台录入页。

## 参考

> - [task360](http://www.task360.net/)
> - [node+mongodb 建站攻略（一期）](http://www.imooc.com/learn/75)
> - [yudaren007007/Y-douban](https://github.com/yudaren007007/Y-douban)




