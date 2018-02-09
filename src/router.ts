import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/boards/Main.vue';
import CreateBoard from './views/CreateBoard.vue';
import PrivacyPolicy from './views/PrivacyPolicy.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/boards/:boardToken',
      name: 'Boards',
      component: Main,
    },
    {
      path: '/create-board',
      name: 'Create Board',
      component: CreateBoard,
    },
    {
      path: '/privacy',
      name: 'Privacy Policy',
      component: PrivacyPolicy,
    },
    {
      path: '*',
      redirect: '/create-board',
    },
  ],
});

