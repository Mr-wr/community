// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import MyMixin from './mixins/MyMixin'
import Title from '@/components/Title/index.vue'
// main.js，注意要在use方法之后执行
import apiFun from './common/api'
import uView from '@/uni_modules/uview-ui'
import Web3 from './utils/bsc1'
Vue.prototype.$web3 = Web3
Vue.prototype.$api = apiFun
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'
Vue.component('Title', Title)
Vue.mixin(MyMixin)
import store from './store'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif
