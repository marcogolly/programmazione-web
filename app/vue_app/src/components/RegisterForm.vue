<template>
    <div>
        <h1>User Registration</h1>
        
        <div class="jumbotron bg-light">
            <form @submit.prevent="registerUser" class="form-signin w-100 m-auto">
                <div class="form-floating">
                    <input type="text" class="form-control" id="username" v-model="username" required>
                    <label for="username">Username</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="name" v-model="name" required>
                    <label for="name">Name</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="surname" v-model="surname" required>
                    <label for="surname">Surname</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="password" v-model="password" required>
                    <label for="password">Password</label>
                </div>
                <button class="btn btn-primary w-100 py-2" type="submit">Register</button>
            </form>
        </div>

        <div class="registration-status"> 
            <p class="text-danger"> {{ errore }} </p>  
        </div>
    </div>
</template>

<script type="text/jsx">

import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            name: '',
            surname: '',
            password: '',
            errore: '',
        }
    },
    
    methods: {
        async registerUser() {
                await axios.post('api/auth/signup', {
                        username: this.username,
                        name: this.name,
                        surname: this.surname,
                        password: this.password
                },{
                    withCredentials: true, // Include credentials (cookies) in the request
                })
                .then(
                    res=> {
                        console.log(res.data);
                        this.$router.push('/LoginForm');
                    }
                    )
                    .catch (error=> { 
                    console.log(error);
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