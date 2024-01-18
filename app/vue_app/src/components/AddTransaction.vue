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
    <p> {{ error }} </p>  
</template>

<script>
import axios from 'axios';
import {formatTransaction} from '../assets/utils.js';
export default {
    name: 'AddTransaction',
    data() {
        return {
            transaction: {
                desc: '',
                cat: '',
                costo: '',
                users: [],
            },
            errore: '',
        };
    },
    mounted() {
        this.addUser();
    },
    methods: {
        async addTransaction() {
            try {
                let newTransaction = await formatTransaction(this.transaction);
                console.log(newTransaction);

                const year = newTransaction.data.getFullYear();
                const month = newTransaction.data.getMonth() + 1;

                const response = await axios.post(`api/budget/${year}/${month}`, newTransaction, {
                    withCredentials: true,
                });
                console.log(response.data);
                this.$router.push('/BudgetPage');
            } catch (error) {
                console.error(error);
            }
        },

        addUser() {
            this.transaction.users.push({name: '', quota: ''});
        },
    },
};
</script>