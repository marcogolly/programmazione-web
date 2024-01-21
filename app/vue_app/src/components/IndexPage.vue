<template>
    <div class="container">
        <div class="jumbotron">
            <h1 v-if="!user" class="mt-4">Welcome to the app!</h1>
            <h1 v-if="user" class="mt-4">Welcome back, {{ user }}!</h1>

            <p class="lead">
                This web app allows you to manage your expenses and record transactions.
            </p>

            <div class="d-flex justify-content-center">
                <router-link to="/LoginForm" class="btn btn-one me-2">
                    Click here to login
                </router-link>
                <router-link to="/RegisterForm" class="btn btn-outline-two">
                    Click here to register
                </router-link>
            </div>
            
            <p class="lead py-4">
                After logging in, you can use the Balance page to view your credits and debts with other users. Additionally, you can use the Budget page to record transactions and track your expenses.
            </p>
            <div class="d-flex justify-content-center">
                <router-link to="/BudgetPage" class="btn btn-one me-2" type="button">
                    Budget
                </router-link>
                <router-link to="/BalancePage" class="btn btn-outline-two" type="button">
                    Balance
                </router-link>
            </div>
            <p class="lead">
                You can navigate between pages using the top navbar.
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
            try{
                const user = await getUser();
                this.user = user.name;
            }catch(err){
                console.log(err);
            }
        },
    },
}
</script>

<style >
@import '../assets/style.css';

</style>
