import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css' // NOTE:qiankun
import microApps from './micro-app' // NOTE:qiankun

// 路由导航守卫
import './middleware'

import { registerMicroApps, start, setDefaultMountApp } from 'qiankun' // NOTE:qiankun

Vue.config.productionTip = false

const instance = new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

/**
 * 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
 * @param {boolean} loading
 */
function loader(loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader,
  }
})

registerMicroApps(apps, {
  beforeLoad: app => {
    console.log(`<==========================================================>`)
    console.log(`[main] beforeLoad ===>app.name===> `, app)
  },

  beforeMount: [
    app => {
      console.log(
        '[main] beforeMount %c%s',
        'color: red;font-size:18px;',
        app.name
      )
    },
  ],

  afterMount: [
    app => {
      console.log(
        '[main] afterMount %c%s',
        'color: red;font-size:18px;',
        app.name
      )
    },
  ],

  afterUnmount: [
    app => {
      console.log(
        '[main] afterUnmount %c%s',
        'color: red;font-size:18px;',
        app.name
      )
    },
  ],
})

// 设置默认路由
// setDefaultMountApp('/sub-vue01')

// 启动qiankun
start()
