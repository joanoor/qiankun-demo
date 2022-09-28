import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './public-path' // NOTE:1、qiankun配置

Vue.config.productionTip = false

let instance = null
function render(props = {}) {
  const { container } = props

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 当子应用独立运行的时候
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue02] bootstraped')
}
export async function mount(props) {
  console.log('[vue02] mount ==>', props)
  render(props)
}

export async function unmount() {
  console.log('[vue02] unmount')
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
