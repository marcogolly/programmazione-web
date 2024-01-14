import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

/*
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Budget from './budget.vue';
import Login from './login.vue';
import Register from './register.vue';
import Home from './index.vue';

const app = createApp({});
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/budget', component: Budget },
  ],
});

app.use(router);
app.mount('#app');

*/