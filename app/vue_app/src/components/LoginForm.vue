<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required><br><br>
            
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required><br><br>
            
            <input type="submit" value="Login">
        </form>
        feedback: {{ feedback }}
    </div>
</template>

<script type="text/jsx">

import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: '',
            feedback: ''
        }
    },
    methods: {
        async login() {
            await axios.post('api/auth/signin', {
                    username: this.username,
                    password: this.password
            }, {
                    withCredentials: true, // Include credentials (cookies) in the request
                })
            .then(
                res=> {
                    console.log(res);
                    this.feedback =res;
                    this.$router.push('/BudgetPage');
                }
                )
                .catch (error=> { 
                    console.log(error);
                });
            
        }
    }
}
</script>

<style>
/* Add any necessary styles here */
</style>
