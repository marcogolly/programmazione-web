<template>
    <main class="form-signin w-100 m-auto">
        
        <div class="jumbotron">
            
            <h1 class="mt-4">Registrati</h1>
            <form @submit.prevent="registerUser" >
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="username" v-model="username" required>
                    <label for="username">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" v-model="name" required>
                    <label for="name">Nome</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="surname" v-model="surname" required>
                    <label for="surname">Cognome</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" v-model="password" required>
                    <label for="password">Password</label>
                </div>
                <button class="btn btn-one w-100 py-2" type="submit">Registrati</button>
            </form>
        </div>

        <div class="registration-status"> 
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
            name: '',
            surname: '',
            password: '',
            errore: '',
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
            }catch(err){
            console.log(err);
            }
        }
    }
}
</script>

<style scoped lang ="scss">
@import '../assets/style.scss';
</style>