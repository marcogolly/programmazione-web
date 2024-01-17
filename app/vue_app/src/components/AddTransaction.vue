<template>
    <div>
        <form @submit.prevent="addTransaction">
            <h1>Add Transaction</h1>
            <label for="data">Data:</label>
            <input id="data" v-model="transaction.data" type = "date" />
            <label for="desc">Description:</label>
            <input id="desc" v-model="transaction.desc" />
            <label for="cat">Category:</label>
            <input id="cat" v-model="transaction.cat" />
            <label for="costo">Cost:</label>
            <input id="costo" v-model="transaction.costo" />

            <div v-for="(user, index) in transaction.users" :key="index">
                <label :for="'user-name-' + index">User Name:</label>
                <input :id="'user-name-' + index" v-model="user.name" />
                <label :for="'user-quota-' + index">Quota:</label>
                <input :id="'user-quota-' + index" v-model="user.quota" />
            </div>
            <button type="button" @click="addUser">Add User</button>

            <button type="submit">Confirm</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AddTransaction',
    data() {
        return {
            transaction: {
                desc: '',
                cat: '',
                costo: '',
                users: [{'':''}]
            },
        };
    },
    methods: {
        async addTransaction() {

            // Transform the users array into an object
            const transformedUsers = {};
            this.transaction.users.forEach(user => {
                transformedUsers[user.name] = user.quota;
            });
            this.transaction.users = transformedUsers;

            this.transaction.costo=parseInt(this.transaction.costo);            
            this.transaction.data=new Date(this.transaction.data);

            const year = this.transaction.data.getFullYear();
            const month = this.transaction.data.getMonth() + 1;
            const response = await axios.post(`api/budget/${year}/${month}`, this.transaction, {
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