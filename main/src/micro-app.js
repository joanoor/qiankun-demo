const microApps = [
  {
    name: 'sub-vue01',
    entry: process.env.VUE_APP_SUB_VUE01,
    activeRule: '/sub-vue01',
    container: '#subapp',
  },
  {
    name: 'sub-vue02',
    entry: process.env.VUE_APP_SUB_VUE02,
    activeRule: '/sub-vue02',
    container: '#subapp',
  },
  {
    name: 'sub-vue03',
    entry: process.env.VUE_APP_SUB_VUE03,
    activeRule: '/sub-vue03',
    container: '#subapp',
  },
  {
    name: 'sub-html',
    entry: process.env.VUE_APP_SUB_HTML,
    activeRule: '/sub-html',
    container: '#subapp',
  },
]

// const apps = microApps.map(item => {
//   return {
//     ...item,
//     props: {
//       routerBase: item.activeRule,
//       getGlobalState: '',
//     },
//   }
// })

export default microApps
