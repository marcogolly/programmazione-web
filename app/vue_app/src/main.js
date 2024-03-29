import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import IndexPage from './components/IndexPage.vue';
import RegisterForm from './components/RegisterForm.vue';
import LoginForm from './components/LoginForm.vue';
import BudgetPage from './components/BudgetPage.vue';
import UpdateTransaction from './components/UpdateTransaction.vue';
import AddTransaction from './components/AddTransaction.vue';
import BalancePage from './components/BalancePage.vue';
import AboutPage from './components/AboutPage.vue';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

import 'bootstrap/dist/css/bootstrap.css';
import './assets/style.css';

const routes = [
  { path: '/LoginForm', component: LoginForm },
  { path: '/RegisterForm', component: RegisterForm },
  { path: '/BudgetPage', component: BudgetPage },
  { path: '/BudgetPage/UpdateTransaction/:id', component: UpdateTransaction },
  { path: '/AddTransaction', component: AddTransaction },
  { path: '/BalancePage', component: BalancePage },
  { path: '/AboutPage', component: AboutPage },
  { path: '/', component: IndexPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).use(bootstrap).mount('#app');
