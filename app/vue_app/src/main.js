import {createApp} from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import IndexPage from './components/IndexPage.vue'
import RegisterForm from './components/RegisterForm.vue'
import LoginForm from './components/LoginForm.vue'
import BudgetPage from './components/BudgetPage.vue'

const routes = [
  { path: '/LoginForm', component: LoginForm },
  { path: '/RegisterForm', component: RegisterForm },
  { path: '/BudgetPage', component: BudgetPage },
  { path: '/', component: IndexPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
