<template>
    <div>
        <form @submit.prevent="addTransaction">
            <h1>Add Transaction</h1>
            <label for="year">Year:</label>
            <input id="year" v-model="transaction.year" />
            <label for="month">Month:</label>
            <input id="month" v-model="transaction.month" />
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
                year: '',
                month: '',
                desc: '',
                cat: '',
                costo: '',
                users: []
            },
        };
    },
    methods: {
        async addTransaction() {
            const year = this.$route.params.year;
            const month = this.$route.params.month;
            const response = await axios.post(`api/budget/${year}/${month}`, this.transaction, {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            this.transaction = response.data;
            console.log(this.transaction);
        },
        addUser() {
            this.transaction.users.push({ name: '', quota: '' });
        },
    },
};
</script>