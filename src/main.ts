import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { createStore } from './store/store';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import Panel from './components/Panel.vue';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.component('panel', Panel);

const store = createStore();
sync(store, router);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
