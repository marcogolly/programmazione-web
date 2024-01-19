<template>
    <div class="container">
        <div class="jumbotron bg-light">
            <h1 v-if="!user" class="display-4">Welcome to the budget app</h1>
            <h1 v-if="user" class="display-4">Welcome back, {{ user }}!</h1>

            <p class="lead">
                This web app allows you to manage your expenses and register transactions
            </p>

            <div class="d-grid gap-2">
                <router-link to="/LoginForm" class="btn btn-primary">
                    Click here to login
                </router-link>
                <router-link to="/RegisterForm" class="btn btn-outline-secondary">
                    Click here to register
                </router-link>
            </div>
            
            <p class="lead py-4">
                After logging in, you can use the budget page to manage your budget and view your balance
                page to register transactions and view your expenses
            </p>
            <div class="d-flex gap justify-content-center py-2">
                <router-link to="/BudgetPage" class="btn btn-primary d-inline-flex align-items-center" type="button">
                    Budget
                </router-link>
                <router-link to="/BalancePage" class="btn btn-outline-secondary d-inline-flex align-items-center" type="button">
                    Balance
                </router-link>
            </div>
            <p class="lead">
                You can use the navigation bar to switch between pages
            </p>
        </div>
    </div>
</template>

<script>
import { getUser } from '../assets/utils.js';

export default {
    data() {
        return {
            user: '',
        };
    },
    mounted() {
        this.getLoggedUser();
    },
    methods: {
        async getLoggedUser() {
            this.user = await getUser();
        },
    },
}
</script>

<style scoped>
.jumbotron {
    margin-top: 50px;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 5px;
}
</style>
