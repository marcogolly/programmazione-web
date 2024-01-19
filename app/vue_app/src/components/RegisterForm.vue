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
            <p class="mt-4"> {{ registrationStatus }} </p>
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
                console.log("porca madonna troia di merda");

                if(response.ok){
                    this.registrationStatus = 'Registration successful';
                    this.$router.push('/LoginForm'); // Route to the login page
                    
                } else {
                    console.log(response.data);  
                    this.registrationStatus = "errore";
                }
                
                
            } catch (error) {
                console.log(error);
                
                this.registrationStatus =error.response.data;
                // Handle error
            }
        }
    }
}
</script>
