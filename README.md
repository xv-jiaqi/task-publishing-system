# 任务发布系统

--- 

[TOC]

---

## 仓库地址

[github.com/kkxujq/task-publishing-system](https://github.com/kkxujq/task-publishing-system)

## 流程图

![用户相关](http://oe8r161mt.bkt.clouddn.com/taskSystem/user.png?imageView/2/w/500/q/100)
<br>
![任务流程](http://oe8r161mt.bkt.clouddn.com/taskSystem/task.png?imageView/2/w/500/q/100)


## 数据库设计

![数据库设计](http://oe8r161mt.bkt.clouddn.com/taskSystem/DB.png?imageView/2/w/500/q/100)


## 开发流程

> - 5/4-5/6，(周四-周六) 分析系统设计，简化流程草图和数据库设计，技术选型
> - 5/7-5/8，(周日-周一) 系统架构，开撸代码<br>
> ***说明**：由于5/4~5/6号在老家（甘肃·平凉）没带电脑，真正代码书写在5/7号开始。*


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
 路由可查看`routes\index.js`下具体定义，主要路由如下：
 - 7.1  `http://localhost:8888` 首页
 - 7.2  `http://localhost:8888/register` 注册
 - 7.3  `http://localhost:8888/list` 任务列表，删除，查看，分享
 - 7.4  `http://localhost:8888/update/:id` 任务详情，修改
 - 7.5  `http://localhost:8888/newTask` 创建任务
 

## 参考

> - [task360](http://www.task360.net/)
> - [node+mongodb 建站攻略（一期）](http://www.imooc.com/learn/75)
> - [yudaren007007/Y-douban](https://github.com/yudaren007007/Y-douban)




