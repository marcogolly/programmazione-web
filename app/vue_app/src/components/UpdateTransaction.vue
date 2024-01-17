<template>
    <h1>Update Transaction</h1>
    <form @submit.prevent="updateTransaction">
            <label for="data">Data:</label>
            <input id="data" v-model="transaction.data" type = "date" />
            <label for="desc">desc:</label>
            <input id="desc" v-model="transaction.desc" />
            <label for="cat">Category:</label>
            <input id="cat" v-model="transaction.cat" />
            <label for="costo">Cost:</label>
            <input id="costo" v-model="transaction.costo" />
            <label for="users">Users:</label>
            <div v-for="(user, index) in transaction.users" :key="index">
                <label :for="'user-name-' + index">User Name:</label>
                <input :id="'user-name-' + index" v-model="user.name" />
                <label :for="'user-quota-' + index">Quota:</label>
                <input :id="'user-quota-' + index" v-model="user.quota" />
            </div>
            <button type="button" @click="addUser">Add User</button>

            <button type="submit">Confirm</button>                                
    </form>
</template>

<script>
import axios from 'axios';
export default {
    name: 'UpdateTransaction',
    data() {
        return {
                transaction: {
                    data: '',
                    desc: '',
                    cat: '',
                    costo: '',
                    users: [{'':''}]
                },
        };
    },
    mounted(){
        try{
            this.byId();
        }catch(err){console.log(err)}
    },
    methods: {
        async byId() {
            const id = this.$route.params.id;
            const year = new Date(this.data).getFullYear();
            const month = new Date(this.data).getMonth() + 1;
            const response = await axios.get(`api/budget/${year}/${month}/${id}`, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            this.transaction = response.data[0];

            console.log(this.transaction);
            this.transaction.data = new Date(this.transaction.data).toISOString().substr(0, 10);
            this.transaction.users = Object.keys(this.transaction.users).map(key => {
                return { name: key, quota: this.transaction.users[key] };
            });
            console.log(this.transaction);
        },
        async updateTransaction(){

            const updatedTransaction = { ...this.transaction };
            updatedTransaction.users = {};
            this.transaction.users.forEach(user => {
                updatedTransaction.users[user.name] = user.quota;
            });

            updatedTransaction.costo=parseInt(updatedTransaction.costo);            
            updatedTransaction.data = new Date(updatedTransaction.data).toISOString().split('T')[0];

            const id = this.$route.params.id;
            const year = this.$route.params.year;
            const month = this.$route.params.month;

            console.log(updatedTransaction);
            const response = await axios.put(`api/budget/${year}/${month}/${id}`, updatedTransaction, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            console.log(response.data);
            
            this.$router.push('/BudgetPage');
        },
        addUser() {
            this.transaction.users.push({name: '', quota: ''});
        },
    },
};
</script>