import Vue from 'vue';
import App from './App.vue';
import vuex from 'vuex';
import '@fortawesome/fontawesome-free/css/all.css';
import store from './store';
Vue.config.productionTip = false;
Vue.use(vuex);
new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
