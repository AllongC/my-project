import Vue from 'vue'
import App from './App'
import Req from '@/utils/index.js'


Object.keys(Req).forEach(key => Vue.prototype[key] = Req[key])

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
