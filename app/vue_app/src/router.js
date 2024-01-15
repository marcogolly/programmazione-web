// router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import HelloWorld from './components/HelloWorld.vue';
import BudgetPage from './components/BudgetPage.vue';
import IndexPage from './components/IndexPage.vue';

// Ensure VueRouter is initialized
Vue.use(VueRouter);

const routes = [
  { path: '/LoginForm', component: LoginForm },
  { path: '/RegisterForm', component: RegisterForm },
  { path: '/HelloWorld', component: HelloWorld },
  { path: '/BudgetPage', component: BudgetPage },
  { path: '/IndexPage', component: IndexPage },
];

const router = new VueRouter({
  routes,
});

export default router;
