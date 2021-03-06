import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './style/element-variables.scss'
import i18n from './lang' // internationalization
import './permission' // permission control
import './style/index.scss' // global css
import './utils/run' //run something
import resize from './utils/resize'
import vueUse from './utils/vue-use'

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

//set global functions, variables, components, etc.
Vue.use(vueUse)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  mixins: [resize],
  render: h => h(App)
}).$mount('#app')
