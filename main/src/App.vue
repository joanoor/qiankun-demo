<template>
  <div id="app" class="layout-wrapper">
    <div class="layout-header">
      <div class="logo">QIANKUN-DEMO01</div>
      <ul class="sub-apps">
        <li v-for="item in microApps" :class="{active: item.activeRule === current}" :key="item.name" @click="goto(item)">{{ item.name }}</li>
      </ul>
      <!-- <div class="userinfo">主应用的state：{{ JSON.stringify(state) }}</div> -->
    </div>
    <div id="subapp"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import microApps from './micro-app'
import NProgress from 'nprogress'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      isLoading: true,
      microApps,
      current: '/sub-vue01'
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  mounted () {
    this.listenRouterChange()
  },
  methods: {
     goto (item) {
      // debugger
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
     listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.sub-apps {
  list-style: none;
  margin: 0;
  li{
    list-style: none;
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
    &.active{
      color: #42b983;
      text-decoration: underline;
    }
  }
}
</style>
