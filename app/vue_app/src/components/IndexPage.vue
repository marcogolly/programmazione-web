<template>
    <div>
        <h1 v-if="!user">Welcome to the budget app</h1>
        <h1 v-if="user">Welcome back, {{user}}!</h1>

        <p>
            This web app allows you to manage your expenses and register transactions
        </p>
        <p>
            <router-link to="/LoginForm">
                Click here to login
            </router-link> <br>
        </p>
        <p>
            <router-link to="/RegisterForm">
                Click here to register
            </router-link> <br>
        </p>
        <p>
            You can use the <router-link to="/BudgetPage">Budget</router-link> page to register transactions and view your expenses
        </p>
        <p>
            You can use the navigation bar to switch between pages
        </p>

    </div>
</template>

<script type="text/jsx">
import axios from 'axios';

export default {
    data() {
        return {
            user: '',
        };
    },
    methods: {
        redirectToLogin() {
            //window.location.href = '/login'
        },
        redirectToRegister() {
            //window.location.href = '/register'
        },
        async isLogged() {
            // todo
            const response = await axios.get('/api/budget/whoami', {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log(response.data);
            if (!response.data) {
                this.user = null;
            }
            else{
                this.user=response.data.username;
            }
        },
    }
}
</script>

