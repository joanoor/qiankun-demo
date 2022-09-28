## 微前端是什么
1. 微前端就是类似后台微服务架构的方式在浏览器进行了实现，简单来说就是同一个应用（页面）的不同模块可以使用不同的技术栈进行开发，并且独立维护。它具备以下几个核心价值：
   * 各子应用独立仓库，独立开发，独立部署，部署完成后主框架自动完成同步更新
   * 技术栈无关，同一个应用的不同模块，可以选择任意框架，或者同一框架不同版本，完全由子应用自主选择
   * 独立运行时，每个子应用之间状态隔离，互不影响
   ![微前端](../assets/images/%E5%BE%AE%E5%89%8D%E7%AB%AF.webp)
2. 目前主流的微前端框架都采用 Master-Slaves 的架构，即主从架构。主应用提供子应用加载器，通过不同的路由加载不同的子应用。在业务功能上，主应用可以提供一些基础的能力，避免各子应用重复开发，比如：
   * 用户的登录、注册管理
   * 系统的统一鉴权管理
   * 导航菜单管理
   * 路由管理
   * 数据管理
   * 通信管理
   ![微前端架构](../assets/images/%E5%BE%AE%E5%89%8D%E7%AB%AF%E6%9E%B6%E6%9E%84.webp)

参考：
1. [微前端：让你的项目永葆青春](https://juejin.cn/post/7100906107383578638) 
2. [为什么舍弃Iframe探究新的微前端技术](https://blog.csdn.net/hyupeng1006/article/details/118405388)
3. [微前端的核心价值](https://www.yuque.com/kuitos/gky7yw/rhduwc)


## 为什么不使用iframe
iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。
* URL 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
* UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中
* 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
* 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

## qiankun是什么
qiankun 是一个基于 single-spa 的微前端实现库

参考：
1. [qiankun官网](https://qiankun.umijs.org/zh/guide)
2. [目标是最完善的微前端解决方案 - qiankun 2.0](https://www.yuque.com/kuitos/gky7yw/viueoh#209fb81d)

## 使用qiankun搭建微前端项目的实践
### 示例项目目录结构
其中，主应用中需安装 ```qiankun``` 应用
```js
.
├── node_modules
├── package-lock.json
├── package.json  // 安装npm-rull-all，可并行或串行执行命令
├── main  // 主应用（基座项目），采用的是vue2.*
│   ├── README.md
│   ├── babel.config.js 
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json  // 安装qiankun
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src
│   │   ├── App.vue
│   │   ├── assets
│   │   ├── components
│   │   ├── main.js   // 
│   │   ├── micro-app.js
│   │   ├── middleware
│   │   ├── router  
│   │   ├── store.js  // 可用于存储微前端项目的公共数据
│   │   └── views
│   └── vue.config.js
├── sub-html  // 子应用，采用的是纯html
│   ├── index.html
│   ├── js
│   │   └── main.js
│   ├── package-lock.json
│   ├── package.json
│   └── public
│       └── index.html
├── sub-vue01 // 子应用，采用的是vue2.*
│   ├── README.md
│   ├── babel.config.js
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src
│   │   ├── App.vue
│   │   ├── assets
│   │   ├── components
│   │   ├── main.js // 需要配置
│   │   ├── public-path.js  
│   │   ├── router  // 需要配置
│   │   ├── store
│   │   └── views
│   └── vue.config.js // 需要配置
├── sub-vue02 // 子应用，采用的是vue2.*
│   ├── README.md
│   ├── babel.config.js
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src
│   │   ├── App.vue
│   │   ├── assets
│   │   ├── components
│   │   ├── main.js
│   │   ├── public-path.js
│   │   ├── router
│   │   ├── store
│   │   └── views
│   └── vue.config.js
└── sub-vue03 // 子应用，采用的是vue2.*
    ├── README.md
    ├── babel.config.js
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── src
    │   ├── App.vue
    │   ├── assets
    │   ├── components
    │   ├── main.js
    │   ├── public-path.js
    │   ├── router
    │   ├── store
    │   └── views
    └── vue.config.js
```

参见：
1. [微前端qiankun从搭建到部署的实践](https://juejin.cn/post/6875462470593904653)
