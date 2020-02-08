import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import HelloWorld from "./components/HelloWorld";

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {name: 'ws', path: '/ws/:id', component: HelloWorld},
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
