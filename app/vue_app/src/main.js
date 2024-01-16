import {createApp} from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import IndexPage from './components/IndexPage.vue'
import RegisterForm from './components/RegisterForm.vue'
import LoginForm from './components/LoginForm.vue'
import BudgetPage from './components/BudgetPage.vue'
import UpdateTransaction from './components/UpdateTransaction.vue'
import AddTransaction from './components/AddTransaction.vue'

import './axios'
//import store from './store';
const routes = [
  { path: '/LoginForm', component: LoginForm },
  { path: '/RegisterForm', component: RegisterForm },
  { path: '/BudgetPage', component: BudgetPage },
  { path: '/UpdateTransaction/:year/:month/:id', component: UpdateTransaction },
  { path: '/AddTransaction', component: AddTransaction },

  { path: '/', component: IndexPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);
//app.use(store);
app.use(router).mount('#app');
