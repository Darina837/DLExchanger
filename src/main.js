import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import {i18n} from './plugins/i18n';
import store from './store/store';
import PageExchange from './pages/PageExchange.vue';
import PageSuccess from './pages/PageSuccess.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import CountryFlag from 'vue-country-flag';

export function translateFilter(text) {
  return i18n.t(text);
}
 
Vue.component('country-flag', CountryFlag);
Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.filter('translate', translateFilter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', 
      name: 'home', 
      component: PageExchange
    },
    {
      path: '/success', 
      name: 'success', 
      component: PageSuccess,
      beforeEnter(from, to, next) {
        if(store.state.isRoute) {
          next();
        } else {
          next('/');
        }
      }
    }
  ]
})

new Vue({
  i18n,
  store,
  render: h => h(App),
  router: router
}).$mount('#app')