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
            try {
                const response = await fetch('http://localhost:3000/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });
                
                if (response.ok) {
                    const user = await response.json();
                    this.feedback = JSON.stringify(user);
                    this.$emit('login', user); // Emit the login event
                    //this.$store.dispatch('loginUser', user);
                    //this.$router.push('/BudgetPage'); // Route to the login page
                } else {
                    this.feedback = 'login not successful';

                    // login failed, handle error
                }
            } catch (error) {
                console.log(error);
                // Handle error
            }
        }
        
    }
};
</script>

<style>
/* Add any necessary styles here */
</style>
