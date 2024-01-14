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
    </div>
</template>

<script type="text/jsx">
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            // Call the API to authenticate the user
            // Replace 'api/auth/login' with the actual API endpoint
            fetch('api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            })
            .then(response => response.json())
            .then(data => {
                // Check if the response contains a user
                if (data.user) {
                    // Route to the budget page
                    this.$router.push('/budget');
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
}
</script>

<style>
/* Add any necessary styles here */
</style>
