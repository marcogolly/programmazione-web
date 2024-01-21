<template>
    <main class="form-signin w-100 m-auto">
        
        <div class="jumbotron">
            
            <h1 class="mt-4">Register</h1>
            <form @submit.prevent="registerUser" >
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="username" v-model="username" required>
                    <label for="username">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" v-model="name" required>
                    <label for="name">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="surname" v-model="surname" required>
                    <label for="surname">Surname</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" v-model="password" required>
                    <label for="password">Password</label>
                </div>
                <button class="btn btn-one w-100 py-2" type="submit">Register</button>
            </form>
        </div>

        <div class="registration-status"> 
            <p class="text-danger"> {{ error }} </p>  
        </div>
    </main>
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
            error: '',
        }
    },
    
    methods: {
        async registerUser() {
            try{
                await axios.post('api/auth/signup', {
                        username: this.username,
                        name: this.name,
                        surname: this.surname,
                        password: this.password
                },{
                    withCredentials: true,  
                })
                .then(
                    ()=> {
                        this.$router.push('/LoginForm');
                    }
                    )
                    .catch (err=> { 
                    console.log(err);
                    this.error =err.response.data;
                });
            }catch(err){
            console.log(err);
            }
        }
    }
}
</script>

<style scoped >
@import '../assets/style.css';
</style>