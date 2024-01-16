<template>
    <div>
        <h1>User Registration</h1>
        
        <form @submit.prevent="registerUser">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required><br><br>
            
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required><br><br>
            
            <label for="surname">Surname:</label>
            <input type="text" id="surname" v-model="surname" required><br><br>
            
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required><br><br>
            
            <input type="submit" value="Register">
        </form>

        <div class="registration-status"> 
            <h1> res: {{ registrationStatus }} </h1>
        </div>
    </div>
</template>

<script type="text/jsx">
export default {
    data() {
        return {
            username: '',
            name: '',
            surname: '',
            password: '',
            registrationStatus: '',
        }
    },
    methods: {
        async registerUser() {
            try {
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        name: this.name,
                        surname: this.surname,
                        password: this.password
                    })
                });

                if(response.ok){
                    this.registrationStatus = 'Registration successful';
                    this.$router.push('/LoginForm'); // Route to the login page
                    
                } else {
                    this.registrationStatus = 'Registration not successful';
                }
                
                
            } catch (error) {
                console.log(error);
                this.registrationStatus = 'Registration not successful';
                // Handle error
            }
        }
    }
}
</script>
