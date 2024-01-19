<template>
    <main class="form-signin w-100 m-auto">
        <div class="jumbotron bg-light">
            <h1>Login</h1>
            <form @submit.prevent="login">
            <div class="form-floating">
                <input type="username" class="form-control" id="username" v-model="username" required>
                <label for="floatingInput">username</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" v-model="password" required>
                <label for="floatingInput">password</label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
        <p class="text-danger"> {{ errore }} </p>  
    </div>
</main>
</template>

<script type="text/jsx">

import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: '',
            errore: ''
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
                        console.log(res.data);
                        this.$router.push('/BudgetPage');
                    }
                    )
                    .catch (error=> { 
                    this.errore =error.response.data;
                });
            
        }
    }
}
</script>

<style>
    .form-signin {
        width: 100%;
        max-width: 630px;
        padding: 15px;
        margin: auto;
    }
</style>
