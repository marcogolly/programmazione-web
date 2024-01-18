<template>
    <div class="container">
        <div class="jumbotron bg-light">
            <h1 v-if="!user" class="display-4">Welcome to the budget app</h1>
            <h1 v-if="user" class="display-4">Welcome back, {{ user }}!</h1>

            <p class="lead">
                This web app allows you to manage your expenses and register transactions
            </p>
            <p>
                <router-link to="/LoginForm" class="btn btn-primary d-inline-flex align-items-center">
                    Click here to login
                </router-link>
                <router-link to="/RegisterForm" class="btn btn-primary d-inline-flex align-items-center">
                    Click here to register
                </router-link>
            </p>
            <p>
                You can use the
                <router-link to="/BudgetPage" class="btn btn-primary d-inline-flex align-items-center">Budget</router-link>
                page to register transactions and view your expenses
            </p>
            <p>
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
