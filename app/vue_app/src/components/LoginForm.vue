<template>
    <main class="form-signin w-100 m-auto">
        <div class="jumbotron">
            <h1 class="mt-4">Accedi</h1>
            <form @submit.prevent="login">
                <div class="form-floating mb-3">
                    <input type="username" class="form-control" id="username" v-model="username" required>
                    <label for="floatingInput">username</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="password" v-model="password" required>
                    <label for="floatingInput">password</label>
                </div>
                <button class="btn btn-one w-100 py-2" type="submit">Accedi</button>
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
            try{
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
