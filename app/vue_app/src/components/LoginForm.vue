<template>
    <main class="form-signin w-100 m-auto">
        <div class="jumbotron">
            <h1 class="mt-4">Log in</h1>
            <form @submit.prevent="login">
                <div class="form-floating mb-3">
                    <input type="username" class="form-control" id="username" v-model="username" required>
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" v-model="password" required>
                    <label for="floatingInput">Password</label>
                </div>
                <button class="btn btn-one w-100 py-2" type="submit">Log in</button>
            </form>
            <p class="text-danger"> {{ error }} </p>  
        </div>
        note: to test the project you can log in with the <strong> user "user1" </strong> with <strong> password "asd"</strong>, that already contains some transactions
    </main>
</template>

<script type="text/jsx">

import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async login() {
            try{
                await axios.post('api/auth/signin', {
                        username: this.username,
                        password: this.password
                    }, {
                        withCredentials: true,  
                    })
                    .then(
                        () =>{
                            this.$router.push('/BudgetPage');
                        }
                    )
                    .catch (error=> { 
                        this.error =error.response.data;
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
