<template>
    <div>
        <h1>Welcome to the Landing Page</h1>
        <router-link to="/LoginForm">Login</router-link>
        <router-link to="/RegisterForm">Register</router-link>
    </div>
</template>

<script type="text/jsx">
export default {
    methods: {
        redirectToLogin() {
            //window.location.href = '/login'
        },
        redirectToRegister() {
            //window.location.href = '/register'
        }
    }
}
</script>

