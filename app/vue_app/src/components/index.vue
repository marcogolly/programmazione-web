<template>
    <div>
        <h1>Welcome to the Landing Page</h1>
        <button @click="redirectToLogin">Login</button>
        <button @click="redirectToRegister">Register</button>
    </div>
</template>

<script type="text/jsx">
export default {
    methods: {
        redirectToLogin() {
            window.location.href = '/login'
        },
        redirectToRegister() {
            window.location.href = '/register'
        }
    }
}
</script>

